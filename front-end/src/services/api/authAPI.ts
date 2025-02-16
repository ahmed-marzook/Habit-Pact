import axios, { AxiosError } from "axios";

export const API_BASE_URL = "http://localhost:8080/api/v1";

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_BASE_URL + "/auth/login", {
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
    const response = await axios.post(API_BASE_URL + "/auth/register", {
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
