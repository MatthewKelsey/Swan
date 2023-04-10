import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User, { IUser } from "../Models/userSchema";
require('dotenv').config()
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<any>> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as DecodedToken;

    const user: IUser | null = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
