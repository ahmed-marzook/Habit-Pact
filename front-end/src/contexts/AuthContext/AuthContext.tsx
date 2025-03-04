import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../../services/api/authService";
import AuthState from "../../types/auth/authState";
import { useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../../utils/handleError";

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
  updateUser: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({ queryKey: ["user"] });
        return res;
      }
    } catch (error) {
      handleApiError(error, {
        defaultMessage: "Registration failed",
        shouldShowFieldErrors: true,
      });
    }
  };

  const updateUser = async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      setAuthState((prev) => ({
        user: user,
        token: prev.token,
        isAuthenticated: prev.isAuthenticated,
      }));
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
        queryClient.invalidateQueries({ queryKey: ["user"] });
        return res;
      }
    } catch (error) {
      handleApiError(error, {
        defaultMessage: "Sign in failed",
      });
    }
  };

  const logout = async (): Promise<void> => {
    queryClient.clear();
    window.location.replace("/dashboard");
    authService.logout();
    setAuthState(initialState);
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{ authState, loginUser, registerUser, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
