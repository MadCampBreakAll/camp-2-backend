import axios from "axios";
import client from "../client.js";
import { getUserByJWT, issueJWT } from "../utils/users.js";

const getUserId = async (accessToken) => {
  const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const kakaoId = response.data.id;
  return kakaoId;
};

const getUser = (kakaoId) => {
  return client.user.findUnique({
    where: {
      id: kakaoId,
    },
  });
};

const isUserExists = async (kakaoId) => {
  const user = await client.user.findUnique({
    where: { id: kakaoId },
    select: { id: true },
  });
  return Boolean(user);
};

export const loginUser = async (req, res) => {
  const accessToken = req.body.accessToken;
  let kakaoId;
  try {
    kakaoId = await getUserId(accessToken);
  } catch (e) {
    res.json({ status: false });
    return;
  }

  const user = await getUser(kakaoId);

  if (user) {
    const jwt = issueJWT(user);
    res.json({ status: true, ...jwt });
  } else {
    res.json({ register: false });
  }
};

export const registerUser = async (req, res) => {
  const kakaoId = await getUserId(req.body.accessToken);

  if (await isUserExists(kakaoId)) {
    res.status(409).json({ status: false });
    return;
  }

  const user = await client.user.create({ data: { ...req.body, id: kakaoId } });
  const jwt = issueJWT(user);
  res.json({ status: true, ...jwt });
};

export const getMe = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ status: false });
  }
  const jwt = req.headers.authorization.split(" ")[1];
  const user = await getUserByJWT(jwt);
  return res.json(user);
};
