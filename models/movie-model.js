const mongoose = require("mongoose");

const Review = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  review: { type: String, required: true }
});

const movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  release_date: { type: Date, required: true },
  upvotes: { type: Number, required: true },
  downvotes: { type: Number, required: true },
  reviews: { type: [Review] },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Movie", movieSchema);
