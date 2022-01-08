import express from "express";
import { loginUser, registerUser, getMe } from "../controllers/users.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authChecker, getMe);

export default router;
