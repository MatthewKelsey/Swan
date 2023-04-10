import { Request, Response } from "express";
import User, { IUser } from "../Models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const saltRounds = 10;
const secret: string = process.env.JWT_SECRET || "";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, ...rest } = req.body;
  try {
    const user: IUser | null = await User.findOne({ email });
    if (user) {
      res.status(409).send({ message: "User already exists", status: 409 });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
      ...rest,
    });
    const savedUser: IUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, secret); 
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 1000, 
    });
    res.status(201).send({ user: savedUser }); 
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Could not create user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (user) {
      const isValidPassword: boolean = await bcrypt.compare(
        password,
        user.password
      );
      if (isValidPassword) {
        const token = jwt.sign({ id: user._id }, secret); 
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600 * 1000, 
        });
        res.status(200).send({ user }); 
        return;
      }
    }
    res
      .status(401)
      .send({ message: "Email and/or password incorrect", status: 401 });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("jwt"); // Delete the client-side cookie
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Could not log out user" });
  }
};
