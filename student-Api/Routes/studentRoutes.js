const  {handleAddSutdent,handleGetAllStudents,handleStudentById} = require("../controllers/studentControllers");

const express = require("express")

const Route = express.Router();

Route.post("/create",handleAddSutdent);
Route.get("/all",handleGetAllStudents);
Route.get("/:id",handleStudentById);

module.exports = Route;
