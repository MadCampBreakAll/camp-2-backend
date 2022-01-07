import express from "express";
import { authChecker } from "../middleware/authChecker.js";
import { getMyDiaries } from "../controllers/diaries.js";

let router = express.Router();

router.get("/me", authChecker, getMyDiaries);

export default router;
