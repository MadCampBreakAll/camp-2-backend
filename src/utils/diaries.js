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
    return { ...e, chamyeoUsers: e.chamyeoUsers.map((item) => item.user) };
  });
};
