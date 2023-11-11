import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(409).send("User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, email, password: hashPassword });
  await newUser.save();
  res.status(201).send("User has been created");
};
