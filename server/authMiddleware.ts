import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config()
interface AuthenticatedRequest extends Request {
  userId: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
