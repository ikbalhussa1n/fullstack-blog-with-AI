import { User } from "../models/users.model.js";
import cloudinary from "../config/cloudinary.js";

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

    const newUser = await User.create({
      name,
      email,
      password,
      photo: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    return res.status(201).json({
      message: "User registration successful",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Fail to create User!" });
  }
};
