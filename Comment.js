const mongoose = require("mongoose");

const Comment = new mongoose.model(
  "Comment",
  new mongoose.Schema({
    username: String,
    text: String,
    createdAt: Date,
  })
);

module.exports = Comment;
