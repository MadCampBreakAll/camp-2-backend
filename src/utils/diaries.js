import client from "../client.js";

export const getUserDiaries = async (userId) => {
  const diaries = await client.diary.findMany({
    where: {
      chamyeoUsers: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      created_at: true,
      nextUser: {
        select: {
          id: true,
          nickname: true,
          body: true,
          bodyColor: true,
          blushColor: true,
          item: true,
        },
      },
      chamyeoUsers: {
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
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  return diaries.map((e) => {
    return {
      ...e,
      nextUser: e.nextUser,
      chamyeoUsers: e.chamyeoUsers.map((item) => item.user),
    };
  });
};

export const createDiary = async (info) => {
  const { title, userIds, ownerId } = info;

  const newDiary = await client.diary.create({
    data: {
      title,
      ownerId,
    },
  });

  userIds.sort((_, __) => 0.5 - Math.random());

  await client.chamyeoUserDiary.createMany({
    data: userIds.map((userId, idx) => {
      return { diaryId: newDiary.id, userId, order: idx };
    }),
  });

  const diary = await client.diary.update({
    where: {
      id: newDiary.id,
    },
    data: {
      nextUserId: userIds[0],
    },
  });

  return diary;
};
