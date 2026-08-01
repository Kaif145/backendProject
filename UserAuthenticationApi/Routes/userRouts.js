import express from "express";
import registerUser from "../controller/severBrain.js";

const Route = express.Router();

Route.post("/create", registerUser);

export default Route;