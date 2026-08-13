import express from "express";
import {registerUser, login} from "../controller/severBrain.js";

const Route = express.Router();

Route.post("/create", registerUser);
Route.get("/login",login);

export default Route;
