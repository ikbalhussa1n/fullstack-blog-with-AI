import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

const createTokenAndSaveCookie = async (userId, res) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      userId,
    },
    process.env.JWT_SECRET_KEY,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1000,
    sameSite: "Strict",
  });

  await User.findByIdAndUpdate(userId, { token });

  return token;
};

export default createTokenAndSaveCookie;
