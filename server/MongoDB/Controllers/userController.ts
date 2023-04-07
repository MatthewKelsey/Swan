import { Request, Response } from "express";
import User, { IUser } from "../Models/userSchema";
import bcrypt from "bcrypt";

const saltRounds = 10;

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
    res.status(201).send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error + "Could not create user" });
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
        res.status(200).send(user);
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

// export const logout = async (req:Request, res:Response): Promise<void> =>{

// }
