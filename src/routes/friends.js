import express from "express";
import {
  getFriends,
  getFriendRequest,
  createFriendRequest,
  acceptFriendRequest,
  searchUser,
} from "../controllers/friends.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.get("/", authChecker, getFriends);
router.get("/requests", authChecker, getFriendRequest);
router.post("/requests", authChecker, createFriendRequest);
router.post("/accept", authChecker, acceptFriendRequest);
router.post("/search", authChecker, searchUser);

export default router;
