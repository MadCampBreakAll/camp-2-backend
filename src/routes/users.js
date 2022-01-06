import express from "express";
import { loginUser, registerUser } from "../controllers/users.js";

let router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
