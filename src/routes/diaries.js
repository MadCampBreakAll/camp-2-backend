import express from "express";
import { authChecker } from "../middleware/authChecker.js";
import { createNewDiary, getMyDiaries } from "../controllers/diaries.js";

let router = express.Router();

router.get("/me", authChecker, getMyDiaries);
router.post("/", authChecker, createNewDiary);

export default router;
