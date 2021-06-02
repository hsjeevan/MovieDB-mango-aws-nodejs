const Movie = require("../models/movie-model");
const User = require("../models/user-model")

exports.createMovie = (req, res, next) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    release_date: new Date(req.body.release_date),
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes,
    reviews: req.body.reviews,
    creator: req.userData.userId,
  });
  movie.save().then(createdMovie => {
    res.status(201).json({
      message: "Movie added successfully",
      movie: {
        ...createdMovie,
        id: createdMovie._id
      }
    });
  })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Creating a movie failed!"
      });
    });
};

exports.updateMovie = (req, res, next) => {
  const movie = new Movie({
    _id: req.params.id,
    name: req.body.name,
    genre: req.body.genre,
    release_date: new Date(req.body.release_date),
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes,
    creator: req.userData.userId,
  });
  updateMovie(req, res, movie, "Update")
};

exports.review = (req, res, next) => {
  updateMovie(req, res, { $push: { reviews: { ...req.body, creator: req.userData.userId } } }, "Review")
};

exports.upvote = (req, res, next) => {
  updateMovie(req, res, { $inc: { upvotes: 1 } }, "upvotes")
};

exports.downvote = (req, res, next) => {
  updateMovie(req, res, { $inc: { downvotes: 1 } }, "downvotes")
};

exports.getMovies = (req, res, next) => {
  const sortBy = req.query.sortby;
  let movieQuery;
  let fetchedMovies;

  if (sortBy)
    movieQuery = Movie.find().sort({ [sortBy]: - 1 });
  else
    movieQuery = Movie.find();

  movieQuery.then(documents => {
    fetchedMovies = documents;
    return Movie.count();
  }).then(count => {
    res.status(200).json({
      message: "Movies fetched successfully!",
      movies: fetchedMovies,
      maxMovies: count
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching movies failed!"
    });
  });
};
exports.recommend = (req, res, next) => {

  User.findOne({ email: req.userData.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    return user;
  }).then(user => {
    if (user.favorite_genre) {
      let fetchedMovies;
      const movieQuery = Movie.find({ genre: user.favorite_genre });
      movieQuery.then(documents => {
        fetchedMovies = documents;
        return documents.length;
      }).then(count => {
        res.status(200).json({
          movies: fetchedMovies,
          maxMovies: count
        });
      });
    }
    else {
      res.status(403).json({
        message: "Favorite genre not available."
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching movies failed!"
    });
  });
};

exports.getMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ message: "Movie not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching movie failed!"
      });
    });
};

exports.deleteMovie = (req, res, next) => {
  Movie.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting movies failed!"
      });
    });
};

function updateMovie(req, res, data, msg) {

  Movie.updateOne({ _id: req.params.id }, data)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: msg + " successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Couldn't udpate movie!"
      });
    });
}