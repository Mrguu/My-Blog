import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import mongoose from "mongoose";
import path from "path";
import { URL } from "url";

dotenv.config();
const app = express();
const __dirname = decodeURI(new URL(".", import.meta.url).pathname);

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json("It work");
});

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Server is running at", process.env.PORT);
    })
  )
  .catch((error) => {
    console.log(error);
  });
