import express from "express";
import { register } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", register);

export default router;
