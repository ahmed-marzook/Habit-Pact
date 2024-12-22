import { test, expect } from "@playwright/test";

import { createTestUser, getAuthToken } from "../utils/auth-helper";
import { createTestHabit } from "../utils/habit-helper";

test.describe("Update Habits", () => {
  let authToken: string;
  let habitId: string;

  test.beforeAll(async ({ request }) => {
    const user = await createTestUser(request);
    authToken = await getAuthToken(request, user.email, user.password);
    habitId = (await createTestHabit(request, authToken)).id;
  });

  test("should update habit with PUT", async ({ request }) => {
    const response = await request.put(`/api/v1/habits/${habitId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        name: "Updated Meditation",
        description: "Updated description",
        frequency: {
          times: 2,
          period: "DAILY",
        },
        tags: ["updated", "meditation"],
        reminder: {
          enabled: false,
        },
      },
    });

    expect(response.status()).toBe(200);
    const habit = await response.json();
    expect(habit.name).toBe("Updated Meditation");
    expect(habit.frequency.times).toBe(2);
  });

  test("should partially update habit with PATCH", async ({ request }) => {
    const response = await request.patch(`/api/v1/habits/${habitId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        description: "Only update description",
      },
    });

    expect(response.status()).toBe(200);
    const habit = await response.json();
    expect(habit.description).toBe("Only update description");
  });
});
