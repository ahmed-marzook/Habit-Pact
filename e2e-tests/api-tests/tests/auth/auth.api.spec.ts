import { test, expect } from "@playwright/test";

import { expectErrorResponse } from "../utils/response-helper";

test.describe("Authentication API", () => {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: "Password123!",
    username: `testuser${Date.now()}`,
    firstName: "Test",
    lastName: "User",
  };

  test.describe.configure({ mode: "serial" }); // Run tests in sequence

  test("should register a new user", async ({ request }) => {
    const response = await request.post("/api/v1/auth/register", {
      data: testUser,
    });

    expect(response.status()).toBe(200);
    const data = await response.json();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("email", testUser.email);
    expect(data).toHaveProperty("username", testUser.username);
    expect(data).toHaveProperty("firstName", testUser.firstName);
    expect(data).toHaveProperty("lastName", testUser.lastName);
    expect(data).toHaveProperty("active", true);
    expect(data).toHaveProperty("createdAt");
    expect(data).toHaveProperty("updatedAt");
  });

  test("should login with valid credentials", async ({ request }) => {
    const response = await request.post("/api/v1/auth/login", {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    });

    expect(response.status()).toBe(200);
    const token = await response.text();
    expect(token).toBeTruthy();
    expect(token.split(".")).toHaveLength(3);
  });

  test("should fail to register duplicate user", async ({ request }) => {
    // Try to register with same email
    const response = await request.post("/api/v1/auth/register", {
      data: {
        ...testUser,
        username: "different_username", // Same email, different username
      },
    });

    expect(response.status()).toBe(409);
    const data = await response.json();

    expectErrorResponse(data, {
      status: "CONFLICT",
      message: `User already exists with email: ${testUser.email}`,
      path: `/api/v1/auth/register`,
    });
  });

  test("should fail to login with wrong password", async ({ request }) => {
    const response = await request.post("/api/v1/auth/login", {
      data: {
        email: testUser.email,
        password: "wrongpassword",
      },
    });

    expect(response.status()).toBe(400);

    const data = await response.json();

    expectErrorResponse(data, {
      status: "BAD_REQUEST",
      message: `UNCAUGHT ERROR`,
      path: `/api/v1/auth/login`,
    });
  });

  test("should fail to register with invalid email", async ({ request }) => {
    const response = await request.post("/api/v1/auth/register", {
      data: {
        ...testUser,
        email: "invalid-email",
        username: "different_username2",
      },
    });

    expect(response.status()).toBe(400);
    const data = await response.json();

    expectErrorResponse(data, {
      status: "BAD_REQUEST",
      message: `Validation error`,
      path: `/api/v1/auth/register`,
      fieldErrors: [
        {
          field: "email",
          message: "Invalid email format",
          object: "createUserRequest",
          rejectedValue: "invalid-email",
        },
      ],
    });
  });

  test("should fail to register with short password", async ({ request }) => {
    const response = await request.post("/api/v1/auth/register", {
      data: {
        ...testUser,
        email: "another@example.com",
        username: "different_username3",
        password: "short",
      },
    });

    expect(response.status()).toBe(400);
    const data = await response.json();

    expectErrorResponse(data, {
      status: "BAD_REQUEST",
      message: "Validation error",
      path: `/api/v1/auth/register`,
      fieldErrors: [
        {
          field: "password",
          message: "Password must be at least 8 characters long",
          object: "createUserRequest",
          rejectedValue: "short",
        },
      ],
    });
  });
});
