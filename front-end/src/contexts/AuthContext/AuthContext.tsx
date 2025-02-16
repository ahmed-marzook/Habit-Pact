import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authService } from "../../services/api/authAPI";
import AuthState from "../../types/auth/authState";

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
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setAuthState(JSON.parse(user));
    }
  }, []);

  const registerUser = async (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => {
    await authService
      .register(email, password, username, firstName, lastName)
      .then((res) => {
        if (res) {
          toast.success("Registration successful!");
        }
      })
      .catch((e) => console.log("IT FAILED" + e));
  };

  const loginUser = async (email: string, password: string) => {
    await authService
      .login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res?.user));
          localStorage.setItem("token", res?.token);
          setAuthState({
            user: res?.user ?? null,
            token: res?.token ?? "",
            isAuthenticated: true,
          });
          toast.success("Sign in successful!");
        }
      })
      .catch((e) => console.log("IT FAILED" + e));
  };

  const logout = async (): Promise<void> => {
    setAuthState(initialState);
    authService.logout();
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
