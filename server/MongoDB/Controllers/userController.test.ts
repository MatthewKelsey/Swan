import request from "supertest";
import app from "../../index";
import User, { IUser } from "../Models/userSchema";
import bcrypt from "bcrypt";

describe("register", () => {
  let testUser: IUser;
  let newUser: IUser;

  beforeAll(async () => {
    testUser = new User({
      email: "testuser@test.com",
      password: "testpassword",
      firstName: "Test",
      lastName: "User",
    });

    await testUser.save();
  });

  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
  });

  afterEach(async () => {
    if (newUser) {
      await User.deleteOne({ email: newUser.email });
    }
  });

  it("should register a new user", async () => {
    const userData = {
      email: "newuser@test.com",
      password: "testpassword",
      firstName: "New",
      lastName: "User",
    };

    const res = await request(app).post("/register").send(userData);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("user");

    const savedUser: IUser | null = await User.findOne({ email: userData.email });
    expect(savedUser?.email).toEqual(userData.email);
    newUser = savedUser!;
  });

  it("should return an error if user already exists", async () => {
    const userData = {
      email: "testuser@test.com",
      password: "testpassword",
      firstName: "Existing",
      lastName: "User",
    };

    const res = await request(app).post("/register").send(userData);
    expect(res.status).toEqual(409);
    expect(res.body).toHaveProperty("message", "User already exists");
  });
});


describe("login", () => {
  let testUser: IUser;

  beforeAll(async () => {
    testUser = new User({
      email: "testuser@test.com",
      password: "testpassword",
      firstName: "Test",
      lastName: "User",
    });

    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    testUser.password = hashedPassword;

    await testUser.save();
  });

  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
  });

  it("should login an existing user", async () => {
    const loginData = {
      email: "testuser@test.com",
      password: "testpassword",
    };

    const res = await request(app).post("/login").send(loginData);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should return an error if email or password is incorrect", async () => {
    const loginData = {
      email: "testuser@test.com",
      password: "wrongpassword",
    };

    const res = await request(app).post("/login").send(loginData);
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty(
      "message",
      "Email and/or password incorrect"
    );
  });
});

describe("logout", () => {
  it("should clear the jwt cookie", async () => {
    const res = await request(app).post("/logout");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});
