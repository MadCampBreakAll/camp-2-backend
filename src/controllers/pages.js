import {
  getDiaryInfo,
  getNextWirtter,
  isUserInDiary,
  renewNextWritter,
} from "../utils/diaries.js";
import { createPage, findDiaryInnerPages, isMyTurn } from "../utils/pages.js";

export const createNewPage = async (req, res) => {
  const userId = res.locals.user.id;
  const diaryId = parseInt(req.body.diaryId);

  if (Number.isNaN(diaryId)) {
    return res.json({ status: false });
  }

  if (!(await isUserInDiary(userId, diaryId))) {
    return res.json({ status: false, message: "User is not in ChamyeoUsers." });
  }

  if (!(await isMyTurn(userId, diaryId))) {
    return res.json({ status: false, message: "It's not my turn!" });
  }

  const info = { ...req.body, diaryId, img: req.file?.location };

  const nextUserId = await getNextWirtter(diaryId);
  console.log(`nextUserId`, nextUserId);

  const page = await createPage({ ...info, userId, nextUserId });
  await renewNextWritter(diaryId, nextUserId);

  return res.json({ status: true, page });
};

export const getDiaryPages = async (req, res) => {
  const userId = res.locals.user.id;
  const diaryId = parseInt(req.query.diaryId);

  if (Number.isNaN(diaryId)) {
    return res.json({
      status: true,
      message: "Must provied diaryId with query parameter.",
    });
  }

  if (!(await isUserInDiary(userId, diaryId))) {
    return res.json({ status: false, message: "User is not in ChamyeoUsers." });
  }

  const diaryInfo = await getDiaryInfo(diaryId);
  const pages = await findDiaryInnerPages(diaryId);

  return res.json({ status: true, diary: diaryInfo, pages });
};
