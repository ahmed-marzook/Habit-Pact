// tests/utils/habit-helper.ts
import { APIRequestContext } from "@playwright/test";

export async function createTestHabit(
  request: APIRequestContext,
  authToken: string
) {
  const response = await request.post("/api/v1/habits", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: {
      name: `Test Habit ${Date.now()}`,
      description: "Test description",
      frequency: {
        times: 1,
        period: "DAILY",
      },
      tags: ["test"],
      reminder: {
        enabled: false,
      },
    },
  });

  if (!response.ok()) {
    throw new Error("Failed to create test habit");
  }

  return response.json();
}

export function generateHabitData(overrides = {}) {
  return {
    name: `Test Habit ${Date.now()}`,
    description: "Test description",
    frequency: {
      times: 1,
      period: "DAILY",
    },
    tags: ["test"],
    reminder: {
      enabled: false,
    },
    ...overrides,
  };
}
