"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const router_1 = __importDefault(require("./router"));
const cors = require("cors");
app.use("cors");
app.use(express.json());
app.use(router_1.default);
app.listen(port, () => {
    `Server is listening on ${port}`;
});
module.exports = app;
