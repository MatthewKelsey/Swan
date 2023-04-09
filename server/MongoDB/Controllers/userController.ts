import { Request, Response } from "express";
import User, { IUser } from "../Models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secret = "your_secret_key"; // Change this to a secure secret key

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
    const token = jwt.sign({ id: savedUser._id }, secret); // Generate a JWT
    res.status(201).send({ user: savedUser, token }); // Send the JWT in the response
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
        const token = jwt.sign({ id: user._id }, secret); // Generate a JWT
        res.status(200).send({ user, token }); // Send the JWT in the response
        return;
      }
    }
    res
      .status(401)
      .send({ message: "Email and/or password incorrect", status: 401 });
  } catch (error) {
    res.status(401).send({ error, message: "Email and/or password incorrect" });
  }
};
