// tests/auth/auth.api.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Authentication API", () => {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: "Password123!",
    username: `testuser${Date.now()}`,
    firstName: "Test",
    lastName: "User",
  };

  test("should register a new user", async ({ request }) => {
    const response = await request.post("/api/v1/auth/register", {
      data: testUser,
    });

    expect(response.status()).toBe(200);
    const data = await response.json();

    // Verify the response matches OpenAPI schema
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("email", testUser.email);
    expect(data).toHaveProperty("username", testUser.username);
    expect(data).toHaveProperty("firstName", testUser.firstName);
    expect(data).toHaveProperty("lastName", testUser.lastName);
    expect(data).toHaveProperty("active", true);
    expect(data).toHaveProperty("createdAt");
    expect(data).toHaveProperty("updatedAt");
  });

  test("should login with valid credentials and receive JWT token", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/auth/login", {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    });

    expect(response.status()).toBe(200);
    const token = await response.text();
    expect(token).toBeTruthy();
    // Verify it looks like a JWT (three dot-separated sections)
    expect(token.split(".")).toHaveLength(3);
  });

  test("should fail to login with invalid credentials", async ({ request }) => {
    const response = await request.post("/api/v1/auth/login", {
      data: {
        email: testUser.email,
        password: "wrongpassword",
      },
    });

    expect(response.status()).toBe(401);
  });

  test("should fail to register with invalid email format", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/auth/register", {
      data: {
        ...testUser,
        email: "invalid-email",
      },
    });

    expect(response.status()).toBe(400);
  });

  test("should fail to register with short password", async ({ request }) => {
    const response = await request.post("/api/v1/auth/register", {
      data: {
        ...testUser,
        password: "short",
      },
    });

    expect(response.status()).toBe(400);
  });

  test("should fail to register with existing email", async ({ request }) => {
    // Try to register the same user twice
    const response = await request.post("/api/v1/auth/register", {
      data: testUser,
    });

    expect(response.status()).toBe(400);
  });
});
