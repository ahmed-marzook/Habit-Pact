import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { ChangePasswordRequest } from "../types/changePasswordRequest";
import type CreateUserRequest from "../types/createUserRequest";
import type UpdateUserRequest from "../types/updateUserRequest";
import type User from "../types/user";
import { handleApiError } from "../utils/handleError";
import { userService } from "../services/api/userService";

export const userKeys = {
  all: ["users"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
  details: (id: string) => [...userKeys.all, "detail", id] as const,
} as const;

export function useUser() {
  return useQuery<User, AxiosError>({
    queryKey: userKeys.profile(),
    staleTime: 30 * 60 * 1000, // Consider data fresh for 5 minutes
    queryFn: () => userService.getUser(),
    throwOnError: (error) => {
      return handleApiError(error, {
        defaultMessage: "Failed to fetch user profile",
        shouldShowFieldErrors: false,
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, UpdateUserRequest>({
    mutationFn: (data) => userService.patchUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      toast.success("Profile Updated Successfully");
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to update profile",
        shouldShowFieldErrors: true,
      });
    },
  });
}

export function useUpdateUserFull() {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, CreateUserRequest>({
    mutationFn: (data) => userService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      toast.success("Profile Updated Successfully");
    },
    onError: (error) => {
      handleApiError(error, {
        defaultMessage: "Failed to update profile",
        shouldShowFieldErrors: true,
      });
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ChangePasswordRequest>({
    mutationFn: (data) => userService.changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() });
      toast.success("Password Changed Successfully");
    },
    onError: (error) => {
      throw handleApiError(error, {
        defaultMessage: "Failed to change password",
        shouldShowFieldErrors: true,
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, void>({
    mutationFn: () => userService.deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("Profile Deleted Successfully");
    },
    onError: (error) => {
      handleApiError(error, {
        defaultMessage: "Failed to delete profile",
        shouldShowFieldErrors: false,
      });
    },
  });
}
