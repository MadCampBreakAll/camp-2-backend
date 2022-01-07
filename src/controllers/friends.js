import client from "../client.js";
import {
  getFriendsByUser,
  getPendingFriendRequests,
  isFriend,
} from "../utils/friends.js";
import { isUserExists } from "../utils/users.js";

export const getFriends = async (req, res) => {
  const user = res.locals.user;
  const friends = await getFriendsByUser(user);
  return res.json(friends);
};

export const getFriendRequest = async (req, res) => {
  const userId = res.locals.user.id;
  const pendingFriendRequests = await getPendingFriendRequests(userId);
  return res.json(pendingFriendRequests);
};

export const createFriendRequest = async (req, res) => {
  const userId = res.locals.user.id;
  const friendId = req.body.friendId;

  if (!(await isUserExists(friendId))) {
    return res.json({ status: false });
  }

  if (await isFriend(userId, friendId)) {
    return res.json({ status: false });
  } else {
    await client.friend.create({
      data: {
        userId,
        friendId,
        status: 0,
      },
    });
    return res.json({ status: true });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const userId = res.locals.user.id;
  const friendId = req.body.friendId;
  const accept = req.body.accept;

  if (
    !(await client.friend.findFirst({
      where: {
        userId: friendId,
        friendId: userId,
        status: 0,
      },
    }))
  ) {
    return res.json({ status: false });
  } else {
    await client.friend.update({
      where: {
        userId_friendId: { userId: friendId, friendId: userId },
      },
      data: {
        status: accept ? 2 : 1,
      },
    });
    return res.json({ status: true });
  }
};
