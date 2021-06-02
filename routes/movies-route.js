const express = require("express");

const MovieController = require("../controllers/movie-controller");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("", checkAuth, MovieController.createMovie);

router.put("/:id", checkAuth, MovieController.updateMovie);
router.put("/:id/upvote", checkAuth, MovieController.upvote);
router.put("/:id/downvote", checkAuth, MovieController.downvote);
router.put("/:id/review", checkAuth, MovieController.review);

router.get("", MovieController.getMovies);
router.get("/recommendations", checkAuth, MovieController.recommend);

router.get("/:id", MovieController.getMovie);

router.delete("/:id", checkAuth, MovieController.deleteMovie);

module.exports = router;
