import express from "express";
import {
  getFriends,
  getFriendRequest,
  createFriendRequest,
  acceptFriendRequest,
} from "../controllers/friends.js";
import { authChecker } from "../middleware/authChecker.js";

let router = express.Router();

router.get("/", authChecker, getFriends);
router.get("/requests", authChecker, getFriendRequest);
router.post("/requests", authChecker, createFriendRequest);
router.post("/accept", authChecker, acceptFriendRequest);

export default router;
