import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  createBlog,
  deleteBlog,
  findALlBlogs,
  getMyBlogs,
  singleBlog,
  updateBlog,
} from "../controller/blog.controller.js";

import { isUser } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create", upload.single("imageBlog"), isUser, createBlog);
router.delete("/delete/:id", isUser, deleteBlog);
router.get("/all", findALlBlogs);
router.get("/myBlogs", isUser, getMyBlogs);
router.get("/singleBlog/:id", singleBlog);
router.put("/update/:id", isUser, updateBlog);

export default router;
