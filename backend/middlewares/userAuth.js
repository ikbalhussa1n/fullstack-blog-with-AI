import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import dotenv from "dotenv";

export const isUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authorized to create blog!" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userID = decode.userId;

    const user = await User.findById(userID);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not authorized to create blog!" });
    }

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res
      .status(401)
      .json({ message: "User not authorized to create blog!" });
  }
};
