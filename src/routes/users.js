import express from "express";
import { loginUser, registerUser, getMe } from "../controllers/users.js";

let router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", getMe);

export default router;
