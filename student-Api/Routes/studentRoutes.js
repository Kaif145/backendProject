const  {handleAddSutdent} = require("../controllers/studentControllers");
const express = require("express")

const Route = express.Router();

Route.post("/create",handleAddSutdent);

module.exports = Route;