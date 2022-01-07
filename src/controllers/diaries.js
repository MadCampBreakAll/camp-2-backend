import { getUserDiaries } from "../utils/diaries.js";

export const getMyDiaries = async (req, res) => {
  const userId = res.locals.user.id;
  const diaries = await getUserDiaries(userId);
  return res.json({ status: true, diaries });
};
