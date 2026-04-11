import { User } from "../models/users.model.js";
import cloudinary from "../config/cloudinary.js";
import { Blog } from "../models/blogs.model.js";

export const createBlog = async (req, res) => {
  try {
    const { category, title, content } = req.body;

    if (!category || !title || !content) {
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
      author: req.user._id,
      title,
      category,
      content,
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

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not available" });
    }

    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (blog.imageBlog?.public_id) {
      await cloudinary.uploader.destroy(blog.imageBlog.public_id);
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const findALlBlogs = async (req, res) => {
  // fetch all blogs
  try {
    const blogs = await Blog.find().populate("author", "name photo");
    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    // Correctly get the user ID from the authenticated user object
    const userId = req.user._id;

    const blogs = await Blog.find({ author: userId }).populate(
      "author",
      "name photo",
    );
    console.log(blogs);
    return res
      .status(200)
      .json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(200).json({ message: "Blog didn't exits!" });
    }

    return res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Authorization
    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "User not authorized to update blog" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // console.log(updatedBlog);
    console.log("Request body:", req.body);

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
