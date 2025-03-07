import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { AxiosError } from "axios";

import CreateHabitRequest from "../types/createHabitRequest";
import HabitResponse from "../types/habitResponse";
import RecordHabitCompletionRequest from "../types/recordHabitCompletionRequest";
import { handleApiError } from "../utils/handleError";
import { habitService } from "../services/api/habitService";

export const habitKeys = {
  all: ["habits"] as const,
  lists: () => [...habitKeys.all, "list"] as const,
  details: (id: string) => [...habitKeys.all, "detail", id] as const,
} as const;

/**
 * Hook to fetch all habits for the current user
 */
export function useHabits() {
  return useQuery<HabitResponse[], AxiosError>({
    queryKey: habitKeys.lists(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    queryFn: () => habitService.getUserHabits(),
    throwOnError: (error) => {
      return handleApiError(error, {
        defaultMessage: "Failed to fetch habits",
        shouldShowFieldErrors: false,
      });
    },
  });
}
/**
 * Hook to record a habit completion
 */
export function useRecordHabitCompletion() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError,
    { habitId: string; data: RecordHabitCompletionRequest }
  >({
    mutationFn: ({ habitId, data }) =>
      habitService.recordHabitCompletion(habitId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to record habit completion",
        shouldShowFieldErrors: true,
      });
    },
  });
}

/**
 * Hook to create a new habit
 */
export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation<HabitResponse, AxiosError, CreateHabitRequest>({
    mutationFn: (data) => habitService.createHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
      toast.success("Habit created successfully");
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to create habit",
        shouldShowFieldErrors: true,
      });
    },
  });
}
