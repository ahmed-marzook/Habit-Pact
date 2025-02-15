import { useQueryClient } from "@tanstack/react-query";

import axios, { AxiosInstance, AxiosError } from "axios";

import { createContext, useContext, useState, ReactNode } from "react";

const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<AuthResponse>(
      "https://api.example.com/login",
      {
        email: email,
        password: password,
      }
    );

    const { token: newToken, user: newUser } = response.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);

    queryClient.invalidateQueries();
    navigate("/dashboard");
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};
