import { User } from "../models/users.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

import createTokenAndSaveCookie from "../jwt/authToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required!" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );

      stream.end(req.file.buffer);
    });

    const encryptPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: encryptPass,
      photo: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });
    const token = await createTokenAndSaveCookie(newUser._id, res);
    return res.status(201).json({
      message: "User registration successful",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Fail to create User!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password fields doesn't match!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password fields doesn't match!" });
    }
    const token = await createTokenAndSaveCookie(user._id, res);

    return res.status(200).json({
      message: "Login successful",
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal error occurred while loging in!" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout!" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not available!" });
    }
    const { password, ...userWithoutPassword } = req.user._doc;
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(400).json({ message: "User not available!" });
  }
};
