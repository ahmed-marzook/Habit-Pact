import User from "../../types/user";

import { api } from "./api";

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post("/auth/login", {
      email: email,
      password: password,
    });
    return response.data;
  },

  async register(
    email: string,
    password: string,
    username: string,
    fistName: string,
    lastName: string
  ) {
    const response = await api.post("/auth/register", {
      email: email,
      password: password,
      username: username,
      firstName: fistName,
      lastName: lastName,
    });
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/users");
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
