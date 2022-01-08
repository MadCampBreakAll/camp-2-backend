import express from "express";
import { createNewPage } from "../controllers/pages.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.post("/", authChecker, createNewPage);

export default router;
