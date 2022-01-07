import client from "../client.js";

export const getFriendsByUser = async (user) => {
  const userId = user.id;
  const friends = await client.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      friends: {
        where: {
          status: 2,
        },
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
      },
    },
  });
  const friendsRelation = await client.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      friendsRelation: {
        where: {
          status: 2,
        },
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
      },
    },
  });
  const friendsRet = [...friends.friends, ...friendsRelation.friendsRelation];
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

export const getPendingFriendRequests = (userId) => {
  return client.friend.findMany({
    where: { friendId: userId, status: 0 },
    select: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};