import express from "express";
import {
  registerUser,
  login,
  profile,
  logout,
  refreshToken,
  getData,
} from "../controller/severBrain.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const Route = express.Router();

Route.post("/create", registerUser);
Route.post("/login", login);
Route.get("/profile", authenticateUser, profile);
Route.get("/logout", logout);
Route.post("/refresh", refreshToken);
Route.get("/data",getData);
export default Route;
