const express = require("express");
const mongoose = require("mongoose");
const student = require("./studentSchema");
const classs = require("./classSchema");
const app = express();
const createcon = async () => {
  await mongoose.connect("mongodb://localhost:27017/practice");
};

// const classSchema = new mongoose.Schema({
//   classname: String,
//   classcode: Number,
//   classdiscription: String,
// });

// const studentSchema = new mongoose.Schema({
//   name: String,
//   classes: [classSchema],
// });

// const classModel = new mongoose.model("class", classSchema);
// const studentModel = new mongoose.model("student", studentSchema);

app.use(express.json());

const findclassbycode = async function (classcode) {
  try {
    createcon();
    const cl = await classModel.findOne({ classcode: classcode });
    console.log(cl);
    if (cl === null) {
      return null;
    }
    return cl;
  } catch (error) {
    console.log(error);
  }
};

app.get("/class", async (req, res) => {
  createcon();
  const cls = await classModel.find();
  res.send(cls);
});

app.post("/class", async (req, res) => {
  try {
    createcon();
    const data = req.body;
    const msg = new Object();
    try {
      const cls = new classModel(data);
      await cls.save();
      msg.type = "success";
      msg.message = "data saved successfully";
      res.send(msg);
    } catch (error) {
      console.log(error);
      msg.type = "error";
      msg.message = "data not saved ";
      res.send(msg);
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/classcode", async (req, res) => {
  console.log(req.body.classcode);
  try {
    const cls = await findclassbycode(req.body.classcode);
    const msg = new Object();
    if (cls === null) {
      msg.messege = "invalid class code check the code!!";
      res.send(msg);
    } else {
      res.send(cls);
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/student", async (req, res) => {
  const msg = new Object();
  const cls = await findclassbycode(req.body.classcode);
  if (cls === null) {
    msg.message = "invalid class code check the code!!";
    res.send(msg);
  }
  const arr = new Array();
  arr.push(cls);
  const stud = new studentModel({
    name: req.body.name,
    classes: arr,
  });
  await stud.save();
  msg.message = "saved successfully";
  res.send(msg);
});
port = 4000;
app.listen(port, () => console.log(`app is running on port ${port}`));
