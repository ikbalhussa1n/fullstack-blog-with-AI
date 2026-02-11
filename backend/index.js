import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to connect Database", error);
    process.exit(1);
  }
};

connectDatabase();

app.use("/user", userRouter);
app.use("/blog", blogRouter);
