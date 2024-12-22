import { test, expect } from "@playwright/test";

import { createTestUser, getAuthToken } from "../utils/auth-helper";

test.describe("Create Habits", () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    const user = await createTestUser(request);
    authToken = await getAuthToken(request, user.email, user.password);
  });

  test("should create a new habit", async ({ request }) => {
    const response = await request.post("/api/v1/habits", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        name: "Morning Meditation",
        description: "10 minutes mindfulness",
        frequency: {
          times: 1,
          period: "DAILY",
        },
        tags: ["wellness", "mindfulness"],
        reminder: {
          enabled: true,
          time: "08:00",
          days: ["MONDAY", "WEDNESDAY", "FRIDAY"],
        },
      },
    });

    expect(response.status()).toBe(200);
    const habit = await response.json();
    expect(habit).toHaveProperty("id");
    expect(habit.name).toBe("Morning Meditation");
    expect(habit.frequency.period).toBe("DAILY");
    expect(habit.tags).toContain("wellness");
    expect(habit.reminder.enabled).toBe(true);
  });

  test("should fail to create habit without required fields", async ({
    request,
  }) => {
    const response = await request.post("/api/v1/habits", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        description: "Missing required name and frequency",
      },
    });

    expect(response.status()).toBe(400);
  });
});
