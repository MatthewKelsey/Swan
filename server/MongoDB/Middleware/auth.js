"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenKey = process.env.JWT_SECRET;
function authMiddleware(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res
            .status(403)
            .send({ message: "Please sign in to continue", status: 403 });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
}
exports.authMiddleware = authMiddleware;
