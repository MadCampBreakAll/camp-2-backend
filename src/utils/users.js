import jwt from "jsonwebtoken";
import client from "../client.js";

export const getUserIdByKakaoId = async (kakaoId) => {
  const user = await client.user.findUnique({
    where: {
      kakaoId,
    },
    select: {
      id: true,
    },
  });

  return user?.id;
};

export const isUserExists = async (kakaoId) => {
  const user = await client.user.findUnique({
    where: { kakaoId },
    select: { id: true },
  });
  return user !== null;
};

export const getUserByJWT = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({
      where: { id },
      select: {
        id: true,
        nickname: true,
        body: true,
        bodyColor: true,
        blushColor: true,
        item: true,
        font: true,
        backgroundColor: true,
        backgroundPaper: true,
      },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const issueJWT = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
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

export const UIChange = async (
  userId,
  font,
  backgroundColor,
  backgroundPaper
) => {
  await client.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(font && { font }),
      ...(backgroundColor && { backgroundColor }),
      ...(backgroundPaper && { backgroundPaper }),
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
