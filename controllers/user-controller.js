const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const { credentails } = require('../credentials')

const JWT_KEY = process.env.JWT_KEY || credentails.JWT_KEY;
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: "User created!",
        result: result
      });
    })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}
exports.findAll = (req, res, next) => {
  let fetchedUsers
  User.find().then(documents => {
    fetchedUsers = documents;
    return User.count();
  }).then(count => {
    res.status(200).json({
      message: "Users fetched successfully!",
      Users: fetchedUsers,
      maxUsers: count
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Users failed!"
    });
  });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting Users failed!"
      });
    });
};


exports.userLogin = (req, res, next) => {

  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.updateFavoriteGenre = (req, res, next) => {
  const data = { favorite_genre: req.body.favorite_genre }
  User.updateOne({ email: req.userData.email }, data)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Favorite Genre successfully updated to " + req.body.favorite_genre });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }

    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Couldn't udpate Favorite Genre!"
      });
    });
}
