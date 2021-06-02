const express = require("express");

const UserController = require("../controllers/user-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);
router.put("/setgenre", checkAuth, UserController.updateFavoriteGenre);

router.get("/fetch", UserController.findAll);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
