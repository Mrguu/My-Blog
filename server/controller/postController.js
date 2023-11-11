import fs from "fs";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import { Error } from "mongoose";

export const createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = `uploads/${req.file.filename}.${ext}`;
  fs.renameSync(path, newPath);

  try {
    const { title, description, content, userowner } = req.body;
    const post = await PostModel.create({
      title,
      description,
      content,
      image: newPath,
      userowner,
    });

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .populate({
        path: "userowner",
        select: "username",
      })
      .sort({ updatedAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log("Error fetching posts:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.content = req.body.content || post.content;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      post.image = `uploads/${req.file.filename}.${ext}`;
      fs.renameSync(path, post.image);
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
