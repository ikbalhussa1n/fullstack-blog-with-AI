import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { isUser } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), register);
router.post("/signin", login);
router.get("/signout", isUser, logout);
router.get("/my-profile", isUser, getMyProfile);

export default router;
