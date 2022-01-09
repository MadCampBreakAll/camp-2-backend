import express from "express";
import {
  loginUser,
  registerUser,
  getMe,
  updateAvatar,
  updateUI,
  checkNickname,
} from "../controllers/users.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authChecker, getMe);
router.post("/avatar", authChecker, updateAvatar);
router.post("/ui", authChecker, updateUI);
router.get("/", checkNickname);

export default router;
