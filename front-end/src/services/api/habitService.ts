import CreateHabitRequest from "../../types/createHabitRequest";
import HabitResponse from "../../types/habitResponse";
import RecordHabitCompletionRequest from "../../types/recordHabitCompletionRequest";
import { handleApiError } from "../../utils/handleError";

import { api } from "./api";

export const habitService = {
  /**
   * Creates a new habit for the authenticated user
   * @param request The habit information
   * @returns Promise<HabitResponse>
   */
  async createHabit(request: CreateHabitRequest): Promise<HabitResponse> {
    try {
      const response = await api.post("/habits", request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Fully updates a habit's information. All fields must be provided.
   * @param habitId The ID of the habit to update
   * @param request The complete habit information
   * @returns Promise<HabitResponse>
   */
  // async updateHabit(
  //   habitId: string,
  //   request: CreateHabitRequest
  // ): Promise<HabitResponse> {
  //   try {
  //     const response = await api.put(`/habits/${habitId}`, request);
  //     return response.data;
  //   } catch (error) {
  //     throw handleApiError(error);
  //   }
  // },

  /**
   * Updates only the provided fields of a habit's information
   * @param habitId The ID of the habit to update
   * @param request Partial habit information
   * @returns Promise<HabitResponse>
   */
  // async patchHabit(
  //   habitId: string,
  //   request: CreateHabitRequest
  // ): Promise<HabitResponse> {
  //   try {
  //     const response = await api.patch(`/habits/${habitId}`, request);
  //     return response.data;
  //   } catch (error) {
  //     throw handleApiError(error);
  //   }
  // },

  /**
   * Deletes a habit
   * @param habitId The ID of the habit to delete
   * @returns Promise<void>
   */
  async deleteHabit(habitId: string): Promise<void> {
    try {
      await api.delete(`/habits/${habitId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Retrieves a specific habit by ID
   * @param habitId The ID of the habit to retrieve
   * @returns Promise<HabitResponse>
   */
  // async getHabit(habitId: string): Promise<HabitResponse> {
  //   try {
  //     const response = await api.get(`/habits/${habitId}`);
  //     return response.data;
  //   } catch (error) {
  //     throw handleApiError(error);
  //   }
  // },

  /**
   * Retrieves all habits for the authenticated user
   * @returns Promise<HabitResponse[]>
   */
  async getUserHabits(): Promise<HabitResponse[]> {
    try {
      const response = await api.get("/habits");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Records a habit completion
   * @param habitId The ID of the habit to record completion for
   * @param request The completion information
   * @returns Promise<void>
   */
  async recordHabitCompletion(
    habitId: string,
    request: RecordHabitCompletionRequest
  ): Promise<void> {
    try {
      await api.put(`/habits/${habitId}/completions`, request);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
