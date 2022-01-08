import { createPage } from "../utils/pages.js";

export const createNewPage = async (req, res) => {
  const userId = res.locals.user.id;
  const info = req.body;

  const page = await createPage({ userId, ...info });
  return res.json({ status: true, page });
};
