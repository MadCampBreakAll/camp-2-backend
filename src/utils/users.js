import jwt from "jsonwebtoken";
import client from "../client.js";

export const isUserExists = async (userId) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  return Boolean(user);
};

export const getUserByJWT = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const issueJWT = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return {
    token,
  };
};

export const avatarChange = async (info) => {
  const { userId, body, bodyColor, blushColor } = info;
  await client.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(body && { body }),
      ...(bodyColor && { bodyColor }),
      ...(blushColor && { blushColor }),
    },
    select: {
      id: true,
    },
  });
};

export const UIChange = async (userId, font, backgroundColor) => {
  await client.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(font && { font }),
      ...(backgroundColor && { backgroundColor }),
    },
    select: {
      id: true,
    },
  });
};

export const isNicknameAvailable = async (nickname) => {
  const user = await client.user.findFirst({
    where: {
      nickname,
    },
    select: {
      id: true,
    },
  });
  return user === null;
};
