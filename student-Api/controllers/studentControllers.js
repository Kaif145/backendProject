const student = require("../module/studentSchema");

// creacte add student;

async function handleAddSutdent(req, res) {
  try {
    const {
      studentName,
      age,
      studentclass,
      mark,
      rollNo,
      email,
      phone,
      address,
    } = req.body;
    const studentData = await student.create({
      studentName: studentName,
      age: age,
      studentclass: studentclass,
      rollNo: rollNo,
      mark: mark,
      email: email,
      phone: phone,
      address: address,
    });
    if (!studentData) {
      return res.status(401).json({
        "err": "err form while create" });
    }
    res.status(201).json({ "student": studentData });
  } catch (error) {
    console.log(error);
   
  }
}

async function handleGetAllStudents(req,res) {
  try{
    const allStudent = await student.find();
    if(!allStudent){
      res.status(404).json({"message" : "students data not founded"});
    }
    res.status(200).json({"AllStudent" : allStudent});
  }catch(err){
    console.log("here is the err",err);
    res.status(500).json({err});
  }
}

async function handleStudentById(req,res) {
  try{
    const id = req.params.id;
    const studentId = await student.findById(id);
    if(!studentId){
      res.status(401).json({"messages":"truble to get student by id "});
    }
    res.status(200).json({"studentId":studentId});
  }catch(err){
     res.status(500).json({err})
  }
}

module.exports = { handleAddSutdent , handleGetAllStudents,handleStudentById};
