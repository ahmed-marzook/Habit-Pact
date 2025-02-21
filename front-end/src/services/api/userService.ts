import CreateUserRequest from "../../types/createUserRequest";
import UpdateUserRequest from "../../types/updateUserRequest";
import User from "../../types/user";

import { api } from "./api";

export const userService = {
  parseError(error: any): Error {
    if (error.response) {
      const errorData = error.response.data;
      if (errorData.errors) {
        return new Error(
          Object.entries(errorData.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(", ")
        );
      }
      if (errorData.message) {
        return new Error(errorData.message);
      }
      return new Error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    }
    if (error.request) {
      return new Error(
        "No response received from server. Please try again later."
      );
    }
    return new Error(error.message || "An unexpected error occurred");
  },

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
      throw this.parseError(error);
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
      throw this.parseError(error);
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
      throw this.parseError(error);
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
      throw this.parseError(error);
    }
  },
};
