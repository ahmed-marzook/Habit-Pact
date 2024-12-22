// tests/utils/auth-helper.ts
import { APIRequestContext } from "@playwright/test";

export async function getAuthToken(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<string> {
  const response = await request.post("/api/v1/auth/login", {
    data: {
      email,
      password,
    },
  });

  if (!response.ok()) {
    throw new Error("Failed to get auth token");
  }

  return response.text();
}

export async function createTestUser(request: APIRequestContext) {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: "Password123!",
    username: `testuser${Date.now()}`,
    firstName: "Test",
    lastName: "User",
  };

  const response = await request.post("/api/v1/auth/register", {
    data: testUser,
  });

  if (!response.ok()) {
    throw new Error("Failed to create test user");
  }

  const userData = await response.json();
  return {
    ...testUser,
    id: userData.id,
  };
}
