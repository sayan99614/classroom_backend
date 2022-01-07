const mongoose = require("mongoose");
const Comment = require("./Comment");
const Tutorial = require("./Tutorial");
const createcon = async () => {
  await mongoose.connect("mongodb://localhost:27017/practice");
};

// const t1 = new Tutorial({
//   title: "Mongoose in one shot",
//   author: "Dheeman Pati",
// });

// const c1 = new Comment({
//   username: "sayan",
//   text: "kamal ka comment 🐅 ",
//   createdAt: Date.now(),
// });

createcon();

const callfun = async () => {
  const tt = await Tutorial.findById("61ba03c43c3c5e15abc2b819");
  tt.comments.push("61ba04b6b40b36ab21ce815c");
  tt.save();
};

const tutorialwidcomm = async function () {
  const tt1 = await Tutorial.findById("61ba03c43c3c5e15abc2b819").populate(
    "comments"
  );
  console.log(tt1);
};

// callfun();
tutorialwidcomm();
