import express from "express";
import { register } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), register);

export default router;
