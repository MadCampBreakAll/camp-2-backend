import { createDiary, getUserDiaries } from "../utils/diaries.js";

export const getMyDiaries = async (req, res) => {
  const userId = res.locals.user.id;
  const diaries = await getUserDiaries(userId);
  return res.json({ status: true, diaries });
};

export const createNewDiary = async (req, res) => {
  const ownerId = res.locals.user.id;
  const info = { ...req.body, ownerId };
  const diary = await createDiary(info);
  return res.json({ status: true, diary });
};
