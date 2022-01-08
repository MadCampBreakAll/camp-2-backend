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
