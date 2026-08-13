import express from "express";
import {registerUser, login, profile} from "../controller/severBrain.js";
import {authenticateUser} from '../middleware/authMiddleware.js'

const Route = express.Router();

Route.post("/create", registerUser);
Route.get("/login",login);
Route.get("/profile",authenticateUser,profile);

export default Route;
