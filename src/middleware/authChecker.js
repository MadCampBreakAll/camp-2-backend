import { getUserByJWT } from "../utils/users.js";

export const authChecker = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    console.log(`token`, token);
    const user = await getUserByJWT(token);
    if (!user) {
      res.status(401).json({ status: false });
    } else {
      console.log(`auth user`, user);
      res.locals.user = user;
      next();
    }
  }
};
