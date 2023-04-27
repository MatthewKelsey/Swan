"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registerUser = void 0;
const userSchema_1 = __importDefault(require("../Models/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const saltRounds = 10;
const secret = process.env.JWT_SECRET || "";
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { email, password } = _a, rest = __rest(_a, ["email", "password"]);
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (user) {
            res.status(409).send({ message: "User already exists", status: 409 });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = new userSchema_1.default(Object.assign({ email, password: hashedPassword }, rest));
        const savedUser = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: savedUser._id }, secret);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600 * 1000,
        });
        res.status(201).send({ user: savedUser });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "Could not create user" });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userSchema_1.default.findOne({ email });
        if (user) {
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (isValidPassword) {
                const token = jsonwebtoken_1.default.sign({ id: user._id }, secret);
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
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("jwt"); // Delete the client-side cookie
        res.status(200).send({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Could not log out user" });
    }
});
exports.logout = logout;
