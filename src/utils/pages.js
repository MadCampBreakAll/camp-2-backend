import client from "../client.js";

export const createPage = async (info) => {
  const { userId, diaryId, title, body, color, img } = info;

  const page = await client.page.create({
    data: {
      userId,
      diaryId,
      title,
      body,
      color,
      img: img ? img : "",
    },
  });

  return page;
};

export const isMyTurn = async (userId, diaryId) => {
  const diary = await client.diary.findFirst({
    where: {
      id: diaryId,
      nextUserId: userId,
    },
    select: {
      id: true,
    },
  });
  return diary !== null;
};

export const findDiaryInnerPages = (diaryId) => {
  return client.page.findMany({
    where: {
      diaryId,
    },
    select: {
      id: true,
      title: true,
      body: true,
      color: true,
      img: true,
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
};
