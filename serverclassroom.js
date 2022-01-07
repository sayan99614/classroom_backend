const express = require("express");
const Classroom = require("./Classroom");
const {
  findclasses,
  saveclass,
  savestudnet,
  findbyEmailandPassword,
  saveclasstoStudent,
} = require("./service");
const app = express();
app.use(express.json());
const msg = new Object();

function deleteProperties(objectToClean) {
  for (var x in objectToClean)
    if (objectToClean.hasOwnProperty(x)) delete objectToClean[x];
}

app.get("/classes", async (req, res) => {
  try {
    const result = await findclasses(req.query.page, req.query.limit);
    if (result !== null) {
      res.status(200).send(result);
    } else {
      msg.messege = "No classrooms are present";
      res.send(msg);
    }
  } catch (error) {
    console.log(error);
    deleteProperties(msg);
    msg.error = "something went wrong please try again later";
    res.send(msg);
  }
});

app.post("/class", (req, res) => {
  try {
    saveclass(req.body);
    msg.messege = "data saved successfully";
    msg.alert = "success";
    res.status(201).send(msg);
  } catch (error) {
    console.log(error);
    deleteProperties(msg);
    msg.error = "data cannot be saved";
    msg.alert = "danger";
    res.status(500).send(msg);
  }
});

app.post("/signup", (req, res) => {
  try {
    savestudnet(req.body);
    msg.messege = "data saved successfully";
    res.status(201).send(msg);
  } catch (error) {
    console.log(error);
    deleteProperties(msg);
    msg.error = "data cannot be saved";
    res.status(500).send(msg);
  }
});

app.post("/login", async (req, res) => {
  try {
    const id = await findbyEmailandPassword(req.body);
    if (id === null) {
      msg.messege = "invalid credentials";
      res.status(404).send(msg);
      return;
    }
    deleteProperties(msg);
    msg._id = id;
    res.status(200).send(msg);
  } catch (error) {
    deleteProperties(msg);
    console.log(error);
    msg.error = "something went wrong please try again later";
    res.status(500).send(msg);
  }
});

//this part will be completed
app.get("/class/:classcode", (req, res) => {
  const classcode = req.params.classcode;
});

app.post("/add", async (req, res) => {
  try {
    const result = await saveclasstoStudent(req.body);
    deleteProperties(msg);
    if (result.val) {
      msg.status = "success";
      msg.messege = result.message;
      res.status(201).send(msg);
    } else {
      msg.status = "danger";
      msg.messege = result.message;
      res.status(404).send(msg);
    }
  } catch (error) {
    console.log(error);
    msg.error = "something went worng";
    res.status(500).send(msg);
  }
});

app.listen(4000, () => {
  console.log("app is running");
});
