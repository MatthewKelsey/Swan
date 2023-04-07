import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../Models/userSchema';
import UserDocument from "../Models/userSchema";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any>> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as DecodedToken;

    const user: UserDocument | null = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
