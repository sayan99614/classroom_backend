const mongoose = require("mongoose");

const Classroom = new mongoose.model(
  "classroom",
  new mongoose.Schema({
    classname: String,
    classcode: Number,
    description: String,
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
  })
);

module.exports = Classroom;
