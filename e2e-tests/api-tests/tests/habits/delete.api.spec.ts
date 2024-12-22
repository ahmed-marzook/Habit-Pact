import { test, expect } from "@playwright/test";

import { createTestUser, getAuthToken } from "../utils/auth-helper";
import { createTestHabit } from "../utils/habit-helper";

test.describe("Delete Habits", () => {
  let authToken: string;
  let habitId: string;

  test.beforeEach(async ({ request }) => {
    const user = await createTestUser(request);
    authToken = await getAuthToken(request, user.email, user.password);
    habitId = (await createTestHabit(request, authToken)).id;
  });

  test("should delete habit", async ({ request }) => {
    const deleteResponse = await request.delete(`/api/v1/habits/${habitId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);

    // Verify habit no longer exists
    const getResponse = await request.get(`/api/v1/habits/${habitId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(getResponse.status()).toBe(404);
    const data = await getResponse.json();

    expect(data).toHaveProperty("status", "NOT_FOUND");
    expect(data).toHaveProperty("timestamp");
    expect(data).toHaveProperty(
      "message",
      `Habit not found not found with habitId: ${habitId}`
    );
    expect(data).toHaveProperty("fieldErrors", null);
    expect(data).toHaveProperty("path", `/api/v1/habits/${habitId}`);
  });
});
