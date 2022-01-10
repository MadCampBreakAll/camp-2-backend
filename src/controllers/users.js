import axios from "axios";
import client from "../client.js";
import {
  getUserIdByKakaoId,
  avatarChange,
  UIChange,
  issueJWT,
  isNicknameAvailable,
} from "../utils/users.js";
import { isUserExists } from "../utils/users.js";

const getKakaoId = async (accessToken) => {
  const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const kakaoId = String(response.data.id);
  return kakaoId;
};

export const loginUser = async (req, res) => {
  const accessToken = req.body.accessToken;
  let kakaoId;
  try {
    kakaoId = await getKakaoId(accessToken);
  } catch (e) {
    res.json({ status: false });
    return;
  }

  const userId = await getUserIdByKakaoId(kakaoId);

  if (userId) {
    const jwt = issueJWT(userId);
    res.json({ status: true, ...jwt });
  } else {
    res.json({ register: false });
  }
};

export const registerUser = async (req, res) => {
  const accessToken = req.body.accessToken;
  let kakaoId;
  try {
    kakaoId = await getKakaoId(accessToken);
  } catch (e) {
    res.json({ status: false });
    return;
  }
  console.log(`kakaoId`, kakaoId);

  if (await isUserExists(kakaoId)) {
    res.json({ status: false });
    return;
  }

  delete req.body["accessToken"];

  const user = await client.user.create({ data: { ...req.body, kakaoId } });
  const jwt = issueJWT(user);
  res.json({ status: true, ...jwt });
};

export const getMe = async (req, res) => {
  const user = res.locals.user;
  return res.json({ status: true, user });
};

export const updateAvatar = async (req, res) => {
  const userId = res.locals.user.id;
  await avatarChange({ ...req.body, userId });
  return res.json({ status: true });
};

export const updateUI = async (req, res) => {
  const userId = res.locals.user.id;
  const font = parseInt(req.body.font);
  const backgroundColor = req.body.backgroundColor;
  const backgroundPaper = parseInt(req.body.backgroundPaper);
  await UIChange(userId, font, backgroundColor, backgroundPaper);
  return res.json({ status: true });
};

export const checkNickname = async (req, res) => {
  const nickname = req.query.nickname;
  if (nickname == null) {
    return res.json({ status: false });
  }
  return res.json({ status: await isNicknameAvailable(nickname) });
};
