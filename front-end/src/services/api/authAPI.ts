import { useQueryClient } from "@tanstack/react-query";

import axios, { AxiosInstance, AxiosError } from "axios";

import { createContext, useContext, useState, ReactNode } from "react";

import User from "../../types/user";
import AuthResponse from "../../types/auth/authResponse";

const api = "http://localhost:8080/api/v1/";

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(api + "/auth/login", {
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};

export const registerAPI = async (
  email: string,
  password: string,
  username: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axios.post(api + "/auth/register", {
      email: email,
      password: password,
      username: username,
      firstName: firstName,
      lastName: lastName,
    });

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};
