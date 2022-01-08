import { isUserInDiary, renewNextWritter } from "../utils/diaries.js";
import { createPage, findDiaryInnerPages } from "../utils/pages.js";

export const createNewPage = async (req, res) => {
  const userId = res.locals.user.id;
  const diaryId = req.body.diaryId;

  if (!(await isUserInDiary(userId, diaryId))) {
    return res.json({ status: false, message: "User is not in ChamyeoUsers." });
  }

  const info = req.body;

  const page = await createPage({ userId, ...info });
  await renewNextWritter(diaryId);
  return res.json({ status: true, page });
};

export const getDiaryPages = async (req, res) => {
  const userId = res.locals.user.id;
  const diaryId = parseInt(req.query.diaryId);

  if (diaryId == null) {
    return res.json({
      status: true,
      message: "Must provied diaryId with query parameter.",
    });
  }

  if (!(await isUserInDiary(userId, diaryId))) {
    return res.json({ status: false, message: "User is not in ChamyeoUsers." });
  }

  const pages = await findDiaryInnerPages(diaryId);
  return res.json({ status: true, pages });
};
