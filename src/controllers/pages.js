import { isUserInDiary, renewNextWritter } from "../utils/diaries.js";
import { createPage, findDiaryInnerPages, isMyTurn } from "../utils/pages.js";

export const createNewPage = async (req, res) => {
  const userId = res.locals.user.id;
  const diaryId = parseInt(req.body.diaryId);

  if (!(await isUserInDiary(userId, diaryId))) {
    return res.json({ status: false, message: "User is not in ChamyeoUsers." });
  }

  if (!(await isMyTurn(userId, diaryId))) {
    return res.json({ status: false, message: "It's not my turn!" });
  }

  const info = { ...req.body, diaryId, img: req.file?.location };

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
