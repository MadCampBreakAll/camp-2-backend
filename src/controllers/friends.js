import client from "../client.js";
import {
  getFriendsByUser,
  getPendingFriendRequests,
  getAskedFriendRequests,
  isFriend,
  searchFriendWithName,
} from "../utils/friends.js";
import { isUserExistsByKakaoId, isUserExistsByUserId } from "../utils/users.js";

export const getFriends = async (req, res) => {
  const user = res.locals.user;
  const friends = await getFriendsByUser(user);
  return res.json({ status: true, users: friends });
};

export const getFriendRequest = async (req, res) => {
  const userId = res.locals.user.id;
  const pendingFriendRequests = await getPendingFriendRequests(userId);
  const askedFriendRequests = await getAskedFriendRequests(userId);
  return res.json({
    status: true,
    pending: pendingFriendRequests,
    asked: askedFriendRequests,
  });
};

export const createFriendRequest = async (req, res) => {
  const userId = res.locals.user.id;
  const friendId = req.body.friendId;

  if (!(await isUserExistsByUserId(friendId))) {
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

export const searchUser = async (req, res) => {
  const userNickName = res.locals.user.nickname;
  const nickname = req.body.nickname;
  if (nickname == null || userNickName === nickname) {
    return res.json({ status: false });
  }
  const friend = await searchFriendWithName(nickname);

  if (!friend) {
    return res.json({ status: false });
  }

  return res.json({ status: true, user: friend });
};
