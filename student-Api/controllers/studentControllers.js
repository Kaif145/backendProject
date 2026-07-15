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

module.exports = { handleAddSutdent };
