import { User } from "../models/users.model.js";
import cloudinary from "../config/cloudinary.js";
import { Blog } from "../models/blogs.model.js";

export const createBlog = async (req, res) => {
  try {
    const { category, title } = req.body;

    if (!category || !title) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Blog image is required!" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );

      stream.end(req.file.buffer);
    });

    const blog = await Blog.create({
      //   author: req.user._id,
      title,
      category,
      imageBlog: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    return res.status(200).json({ message: "Post created sucessfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Fail to Submit post!" });
  }
};
