import { getUserByJWT } from "../utils/users.js";

export const authChecker = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const user = await getUserByJWT(token);
    if (!user) {
      res.json({ login: false, message: "Token is not valid!" });
    } else {
      res.locals.user = user;
      next();
    }
  } else {
    res.json({ login: false, message: "Must provide authorization header." });
  }
};
