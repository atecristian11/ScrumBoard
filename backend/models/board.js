const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  name: String,
  description: String,
  taskStatus: String,
  imageUrl: String,
  date: { type: Date, defaul: Date.now },
});

const board = mongoose.model("board", boardSchema);
module.exports = board;
