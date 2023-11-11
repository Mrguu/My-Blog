import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/postController.js";
import multer from "multer";

const uploadMiddleware = multer({ dest: "/uploads" });

const router = express.Router();

router.post("/blog", uploadMiddleware.single("file"), createPost);

router.get("/blog", getPosts);

router.get("/blog/:id", getPost);

router.patch("/blog/:id", uploadMiddleware.single("file"), updatePost);

router.delete("/blog/:id", deletePost);

export default router;
