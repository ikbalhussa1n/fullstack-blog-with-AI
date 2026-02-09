import express from "express";
import { login, logout, register } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), register);
router.post("/signin", login);
router.get("/signout", logout);

export default router;
