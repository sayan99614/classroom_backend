const mongoose = require("mongoose");
const Classroom = require("./Classroom");
const Student = require("./Studnet");

const conn = async () => {
  await mongoose.connect("mongodb://localhost:27017/classroom");
};
const findclasses = async function (reqpage, reqlimit) {
  conn();
  let classes = Classroom.find().populate("students");

  const page = parseInt(reqpage) || 1;
  const pageSize = parseInt(reqlimit) || 3;
  const skip = (page - 1) * pageSize;
  const total = await Classroom.countDocuments();

  const pages = Math.ceil(total / pageSize);
  classes = classes.skip(skip).limit(pageSize);

  const result = await classes;

  if (classes.length === 0) {
    return null;
  }

  const obj = {
    status: "success",
    count: result.length,
    page,
    pages,
    data: result,
  };

  return obj;
};

const findsingleclass = async function (_id) {
  conn();
  const classes = await Classroom.findById(_id).populate("student");
  if (classes !== null) {
    return classes;
  }
  return classes;
};

const saveclass = (classobj) => {
  conn();
  const classcode = new Date().valueOf();
  const cr = new Classroom({
    classname: classobj.classname,
    classcode: classcode,
    description: classobj.description,
  });
  cr.save((err) => {
    if (err) {
      throw new Error("data could not be saved");
    }
  });
};

const savestudnet = (stdobj) => {
  conn();
  const stud = new Student(stdobj);
  stud.save((err) => {
    if (err) {
      throw new Error("data could not be saved");
    }
  });
};

const getStudentById = async (_id) => {
  conn();
  const stud = await Student.findById(_id);
  if (stud !== null) {
    return stud;
  } else {
    return null;
  }
};

const findbyEmailandPassword = async (studobj) => {
  conn();
  const stud = await Student.find({
    email: studobj.email,
    password: studobj.password,
  });
  if (stud.length === 0) {
    console.log("yessssssss");
    return null;
  }
  return stud[0]._id.toString();
};

const getStudentClasses = async (_id) => {
  conn();
  const student = await Student.findById(_id).populate("classroom");
  if (student !== null) {
    return student.classes;
  }
  return null;
};

const findclassByClassCode = async (code) => {
  conn();
  const classsingle = await Classroom.find({
    classcode: code,
  });
  if (classsingle.length === 0) {
    return null;
  }
  return classsingle[0];
};

const saveclasstoStudent = async (obj) => {
  try {
    const singleclass = await findclassByClassCode(obj.classcode);
    const student = await Student.findById(obj.s_id);
    const objj = new Object();
    if (singleclass === null || student === null) {
      objj.val = false;
      objj.message = "invalid class code";
      return objj;
    } else {
      student.classes.map((item) => {
        if (singleclass._id.toString() === item.toString()) {
          objj.val = false;
          objj.message = "student is already linked with the class";
        }
        return objj;
      });

      if (objj.val === false) {
        return objj;
      }

      singleclass.students.push(student._id);
      student.classes.push(singleclass._id);
      await singleclass.save();
      await student.save();
      objj.val = true;
      objj.message = "student linked to the class";
      return objj;
    }
  } catch (error) {
    console.log("this part");
    console.log(error);
  }
};

module.exports = {
  findclasses: findclasses,
  findsingleclass: findsingleclass,
  saveclass: saveclass,
  savestudnet: savestudnet,
  getStudentClasses: getStudentClasses,
  findbyEmailandPassword: findbyEmailandPassword,
  getStudentById: getStudentById,
  findclassByClassCode: findclassByClassCode,
  saveclasstoStudent: saveclasstoStudent,
};
