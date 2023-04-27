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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const userSchema_1 = __importDefault(require("../Models/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
describe("register", () => {
    let testUser;
    let newUser;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testUser = new userSchema_1.default({
            email: "testuser@test.com",
            password: "testpassword",
            firstName: "Test",
            lastName: "User",
        });
        yield testUser.save();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userSchema_1.default.deleteOne({ email: testUser.email });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        if (newUser) {
            yield userSchema_1.default.deleteOne({ email: newUser.email });
        }
    }));
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "newuser@test.com",
            password: "testpassword",
            firstName: "New",
            lastName: "User",
        };
        const res = yield (0, supertest_1.default)(index_1.default).post("/register").send(userData);
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("user");
        const savedUser = yield userSchema_1.default.findOne({ email: userData.email });
        expect(savedUser === null || savedUser === void 0 ? void 0 : savedUser.email).toEqual(userData.email);
        newUser = savedUser;
    }));
    it("should return an error if user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "testuser@test.com",
            password: "testpassword",
            firstName: "Existing",
            lastName: "User",
        };
        const res = yield (0, supertest_1.default)(index_1.default).post("/register").send(userData);
        expect(res.status).toEqual(409);
        expect(res.body).toHaveProperty("message", "User already exists");
    }));
});
describe("login", () => {
    let testUser;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testUser = new userSchema_1.default({
            email: "testuser@test.com",
            password: "testpassword",
            firstName: "Test",
            lastName: "User",
        });
        const hashedPassword = yield bcrypt_1.default.hash(testUser.password, 10);
        testUser.password = hashedPassword;
        yield testUser.save();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userSchema_1.default.deleteOne({ email: testUser.email });
    }));
    it("should login an existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginData = {
            email: "testuser@test.com",
            password: "testpassword",
        };
        const res = yield (0, supertest_1.default)(index_1.default).post("/login").send(loginData);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("user");
        expect(res.headers["set-cookie"]).toBeDefined();
    }));
    it("should return an error if email or password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginData = {
            email: "testuser@test.com",
            password: "wrongpassword",
        };
        const res = yield (0, supertest_1.default)(index_1.default).post("/login").send(loginData);
        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty("message", "Email and/or password incorrect");
    }));
});
describe("logout", () => {
    it("should clear the jwt cookie", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/logout");
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message", "Logged out successfully");
        expect(res.headers["set-cookie"]).toBeDefined();
    }));
});
