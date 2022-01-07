const mongoose = require("mongoose");

const Student = new mongoose.model(
  "student",
  new mongoose.Schema({
    name: String,
    email: String,
    college: String,
    semester: String,
    password: String,
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classroom",
      },
    ],
  })
);

module.exports = Student;
