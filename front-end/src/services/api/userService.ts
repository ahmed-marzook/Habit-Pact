import CreateUserRequest from "../../types/createUserRequest";
import UpdateUserRequest from "../../types/updateUserRequest";
import User from "../../types/user";
import { handleApiError } from "../../utils/handleError";

import { api } from "./api";

export const userService = {
  /**
   * Fully updates a user's information. All fields must be provided.
   * @param request The complete user information
   * @returns Promise<UserResponse>
   */
  async updateUser(request: CreateUserRequest): Promise<User> {
    try {
      const response = await api.put("/users", request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Updates only the provided fields of a user's information
   * @param request Partial user information
   * @returns Promise<UserResponse>
   */
  async patchUser(request: UpdateUserRequest): Promise<User> {
    try {
      const response = await api.patch("/users", request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Soft deletes the authenticated user
   * @returns Promise<void>
   */
  async deleteUser(): Promise<void> {
    try {
      await api.delete("/users");
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Retrieves authenticated user information
   * @returns Promise<UserResponse>
   */
  async getUser(): Promise<User> {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
