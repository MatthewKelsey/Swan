import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const tokenKey: Secret = process.env.JWT_SECRET as Secret;

export interface CustomRequest extends Request {
  user?: JwtPayload;
}

export function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(403)
      .send({ message: "Please sign in to continue", status: 403 });
  }
  try {
    const decoded: JwtPayload = jwt.verify(token, tokenKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}
