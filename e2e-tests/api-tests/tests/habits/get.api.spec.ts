import { test, expect } from "@playwright/test";

import { createTestUser, getAuthToken } from "../utils/auth-helper";
import { createTestHabit } from "../utils/habit-helper";

test.describe("Get Habits", () => {
  let authToken: string;
  let habitId: string;

  test.beforeAll(async ({ request }) => {
    const user = await createTestUser(request);
    authToken = await getAuthToken(request, user.email, user.password);
    habitId = (await createTestHabit(request, authToken)).id;
  });

  test("should get all user habits", async ({ request }) => {
    const response = await request.get("/api/v1/habits", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status()).toBe(200);
    const habits = await response.json();
    expect(Array.isArray(habits)).toBe(true);
    expect(habits.length).toBeGreaterThan(0);
  });

  test("should get specific habit by ID", async ({ request }) => {
    const response = await request.get(`/api/v1/habits/${habitId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status()).toBe(200);
    const habit = await response.json();
    expect(habit.id).toBe(habitId);
  });
});
