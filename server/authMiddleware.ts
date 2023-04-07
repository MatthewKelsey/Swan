import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(token, 'secret_key');
    const userId = decodedToken.userId;
    req.userId = userId; // define userId property in AuthenticatedRequest
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
