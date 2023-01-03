const request = require("supertest");
const app = require("../src/app");

describe("POST /users", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/v1/user").send({
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
      first_name: "Test",
      last_name: "User",
      date_of_birth: "1990-01-01",
      gender: "Male",
      profile_picture: "test.jpg",
      user_role: "admin",
    });

    expect(response.status).toBe(200);
  });
});

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const response = await request(app).get("/api/v1/user");
    console.log(response.text);
    expect(response.status).toBe(200);
  });
});

describe("GET /users/:id", () => {
  it("should return a single user", async () => {
    const response = await request(app).get("/api/v1/user/1");
    console.log(response.text);
    expect(response.status).toBe(200);
  });
});

