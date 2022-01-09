import express from "express";
import { createNewPage, getDiaryPages } from "../controllers/pages.js";
import { authChecker } from "../middleware/authChecker.js";
import { upload } from "../utils/image.js";
import { wrapAsync } from "../utils/errors.js";

let router = express.Router();

router.get("/", authChecker, wrapAsync(getDiaryPages));
router.post("/", authChecker, upload.single("img"), wrapAsync(createNewPage));

export default router;
