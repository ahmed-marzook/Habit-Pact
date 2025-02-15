import { createContext, useContext, useEffect, useState } from "react";
import User from "../../types/user";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../../services/api/authAPI";
import axios from "axios";

type UserContextType = {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  registerUser: (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => {
    await registerAPI(email, password, username, firstName, lastName)
      .then((res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res?.data));
          navigate("/login");
        }
      })
      .catch((e) => console.log("IT FAILED" + e));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res?.data.user));
          localStorage.setItem("token", res?.data.token);

          setUser(res?.data.user ?? null);
          setToken(res?.data.token ?? "");
          navigate("/dashboard");
        }
      })
      .catch((e) => console.log("IT FAILED" + e));
  };

  const logout = async (): Promise<void> => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
