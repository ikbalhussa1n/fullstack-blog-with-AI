import express from "express";
import { upload } from "../middlewares/multer.js";
import { createBlog } from "../controller/blog.controller.js";

import { isUser } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create", upload.single("imageBlog"), isUser, createBlog);

export default router;
