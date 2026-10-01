import express from "express";
import {
  registerUser,
  login,
  profile,
  logout,
  refreshToken,
} from "../controller/severBrain.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const Route = express.Router();

Route.post("/create", registerUser);
Route.post("/login", login);
Route.get("/profile", authenticateUser, profile);
Route.get("/logout", logout);
Route.post("/refresh", refreshToken);

export default Route;
