import express from "express";
import { register } from "../controller/registerController.js";
import { login } from "../controller/loginController.js";
import { user } from "../controller/loginController.js";

const router = express.Router();

router.post("/auth/register", register);

router.post("/auth/login", login);

router.get("/user/:userId", user);

export default router;
