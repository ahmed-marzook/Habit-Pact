import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../../services/api/authAPI";
import AuthState from "../../types/auth/authState";
import axios, { AxiosError } from "axios";
import APIErrorResponse from "../../types/ErrorResponse";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
};

type AuthContextType = {
  authState: AuthState;
  registerUser: (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userStr && token) {
      const user = JSON.parse(userStr);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  const registerUser = async (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const res = await authService.register(
        email,
        password,
        username,
        firstName,
        lastName
      );

      if (res) {
        toast.success("Registration successful!");
        toast.success("Please Sign In");
        return res;
      }
    } catch (error) {
      // First check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        // Now we can type assert the error response
        const axiosError = error as AxiosError<APIErrorResponse>;
        const fieldErrors = axiosError.response?.data?.fieldErrors;

        // Display individual field errors as separate toasts
        if (fieldErrors && fieldErrors.length > 0) {
          fieldErrors.forEach((fieldError) => {
            toast.error(fieldError.message, {
              icon: <span>❌</span>,
              position: "top-right",
            });
          });
        } else {
          // Fallback to general error message
          const errorMessage =
            axiosError.response?.data?.message || "Registration failed";
          toast.error(errorMessage, {
            icon: <span>❌</span>,
          });
        }
      } else {
        toast.error("An unexpected error occurred during registration");
      }
      throw error;
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await authService.login(email, password);

      if (res) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);

        setAuthState({
          user: res.user ?? null,
          token: res.token ?? "",
          isAuthenticated: true,
        });

        toast.success("Sign in successful!");
        return res;
      }
    } catch (error) {
      // First check if it's an AxiosError
      if (axios.isAxiosError(error)) {
        // Now we can type assert the error response
        const axiosError = error as AxiosError<APIErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.message || "Sign in failed";
        toast.error(errorMessage, {
          icon: <span>❌</span>,
        });
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    window.location.replace("/dashboard");
    authService.logout();
    setAuthState(initialState);
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{ authState, loginUser, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
