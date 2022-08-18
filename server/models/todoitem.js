const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: String,
});

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
