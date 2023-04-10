import supertest from "supertest";
import router from "./router";

const request = supertest(router);

describe("Scraper routes", () => {
  it("should return 401 Unauthorized for GET /events when not authenticated", async () => {
    const response = await request.get("/events");
    expect(response.status).toBe(401);
  });

  it("should return 401 Unauthorized for POST /odds when not authenticated", async () => {
    const response = await request.post("/odds");
    expect(response.status).toBe(401);
  });
});

describe("User routes", () => {
  it("should return 200 OK for POST /register with valid user data", async () => {
    const response = await request.post("/register").send({
      email: "testuser@example.com",
      password: "password123",
      firstName: "Test",
      lastName: "User",
    });
    expect(response.status).toBe(200);
  });

  it("should return 409 Conflict for POST /register with duplicate user email", async () => {
    const response = await request.post("/register").send({
      email: "testuser@example.com",
      password: "password456",
      firstName: "Another",
      lastName: "User",
    });
    expect(response.status).toBe(409);
  });

  it("should return 200 OK for POST /login with valid credentials", async () => {
    const response = await request.post("/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
  });

  it("should return 401 Unauthorized for POST /login with invalid credentials", async () => {
    const response = await request.post("/login").send({
      email: "testuser@example.com",
      password: "invalidpassword",
    });
    expect(response.status).toBe(401);
  });
});
