import express from "express";
import { upload } from "../middlewares/multer.js";
import { createBlog } from "../controller/blog.controller.js";

const router = express.Router();

router.post("/create", upload.single("imageBlog"), createBlog);

export default router;
