import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardLayout from "./components/layout/Layout/DashboardLayout/DashboardLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorBoundary /> },
  { path: "/login", element: <SignIn />, errorElement: <ErrorBoundary /> },
  { path: "/register", element: <Register />, errorElement: <ErrorBoundary /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
