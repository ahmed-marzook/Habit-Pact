import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import DashboardLayout from "./components/layout/Layout/DashboardLayout/DashboardLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/SignInPage/SignIn";
import Register from "./pages/RegisterPage/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { requireAuth } from "./utils/requireAuth";
import Overview from "./pages/OverviewPage/Overview";
import Habits from "./pages/HabitsPage/Habits";
import Friends from "./pages/FriendsPage/Friends";
import Settings from "./pages/SettingsPage/Settings";
import { handleApiError } from "./utils/handleError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

queryClient.setDefaultOptions({
  queries: {
    throwOnError: (error) => {
      return handleApiError(error, {
        defaultMessage: "Somthign went wrong",
        shouldShowFieldErrors: false,
      });
    },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorBoundary /> },
  {
    path: "login",
    element: <SignIn />,
    errorElement: <ErrorBoundary />,
    loader: () => {
      const token = localStorage.getItem("token");
      if (token) {
        throw redirect("/dashboard");
      }
      return null;
    },
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
    loader: () => {
      const token = localStorage.getItem("token");
      if (token) {
        throw redirect("/dashboard");
      }
      return null;
    },
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    loader: async () => {
      const userData = await requireAuth();
      return userData;
    },
    children: [
      {
        index: true,
        element: <Overview />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "habits",
        element: <Habits />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "friends",
        element: <Friends />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer autoClose={2000} closeOnClick draggable />
    </>
  );
}

export default App;
