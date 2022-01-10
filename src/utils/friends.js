import client from "../client.js";

export const getFriendsByUser = async (user) => {
  const userId = user.id;
  const friends = await client.friend.findMany({
    where: { userId, status: 2 },
    select: {
      friend: {
        select: {
          id: true,
          nickname: true,
          body: true,
          bodyColor: true,
          blushColor: true,
          item: true,
        },
      },
    },
  });
  const friendsRelation = await client.friend.findMany({
    where: { friendId: userId, status: 2 },
    select: {
      user: {
        select: {
          id: true,
          nickname: true,
          body: true,
          bodyColor: true,
          blushColor: true,
          item: true,
        },
      },
    },
  });
  const friendsRet = [
    ...friends.map((e) => e.friend),
    ...friendsRelation.map((e) => e.user),
  ];
  return friendsRet;
};

export const isFriend = async (userId, friendId) => {
  const user = await client.friend.findMany({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
    select: {
      userId: true,
    },
  });
  return user.length !== 0;
};

export const getPendingFriendRequests = async (userId) => {
  const users = await client.friend.findMany({
    where: { friendId: userId, status: 0 },
    select: {
      user: {
        select: {
          id: true,
          nickname: true,
          body: true,
          bodyColor: true,
          blushColor: true,
          item: true,
        },
      },
    },
  });
  return users.map((e) => e.user);
};

export const searchFriendWithName = async (nickname) => {
  const friend = await client.user.findFirst({
    where: {
      nickname,
    },
    select: {
      id: true,
      nickname: true,
    },
  });
  return friend;
};
