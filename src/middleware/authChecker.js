import { getUserByJWT } from "../utils/users.js";

export const authChecker = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const user = await getUserByJWT(token);
    if (!user) {
      res.json({ status: false });
    } else {
      res.locals.user = user;
      next();
    }
  } else {
    res.json({ status: false });
  }
};
