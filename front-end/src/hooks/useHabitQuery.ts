import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { AxiosError } from "axios";

import CreateHabitRequest from "../types/createHabitRequest";
import HabitResponse from "../types/habitResponse";
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
 * Hook to fetch a single habit by ID
 */
export function useHabit(habitId: string) {
  return useQuery<HabitResponse, AxiosError>({
    queryKey: habitKeys.details(habitId),
    staleTime: 5 * 60 * 1000,
    queryFn: () => habitService.getHabit(habitId),
    throwOnError: (error) => {
      return handleApiError(error, {
        defaultMessage: "Failed to fetch habit details",
        shouldShowFieldErrors: false,
      });
    },
    enabled: !!habitId, // Only run query if habitId is provided
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

/**
 * Hook to update a habit (full update)
 */
export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation<
    HabitResponse,
    AxiosError,
    { habitId: string; data: CreateHabitRequest }
  >({
    mutationFn: ({ habitId, data }) => habitService.updateHabit(habitId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: habitKeys.details(variables.habitId),
      });
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
      toast.success("Habit updated successfully");
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to update habit",
        shouldShowFieldErrors: true,
      });
    },
  });
}

/**
 * Hook to patch a habit (partial update)
 */
export function usePatchHabit() {
  const queryClient = useQueryClient();

  return useMutation<
    HabitResponse,
    AxiosError,
    { habitId: string; data: UpdateHabitRequest }
  >({
    mutationFn: ({ habitId, data }) => habitService.patchHabit(habitId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: habitKeys.details(variables.habitId),
      });
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
      toast.success("Habit updated successfully");
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to update habit",
        shouldShowFieldErrors: true,
      });
    },
  });
}

/**
 * Hook to delete a habit
 */
export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (habitId) => habitService.deleteHabit(habitId),
    onSuccess: (_, habitId) => {
      queryClient.invalidateQueries({ queryKey: habitKeys.lists() });
      queryClient.removeQueries({ queryKey: habitKeys.details(habitId) });
      toast.success("Habit deleted successfully");
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to delete habit",
        shouldShowFieldErrors: false,
      });
    },
  });
}
