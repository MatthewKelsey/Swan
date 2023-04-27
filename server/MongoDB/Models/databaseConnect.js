"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.MONGODB_CREDENTIALS;
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(password).then(() => {
    console.log("Connected to database");
});
exports.default = mongoose_1.default;
