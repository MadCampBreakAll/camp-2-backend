import express from "express";
import { createNewPage, getDiaryPages } from "../controllers/pages.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.get("/", authChecker, getDiaryPages);
router.post("/", authChecker, createNewPage);

export default router;
