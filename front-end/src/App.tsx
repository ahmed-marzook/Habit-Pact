import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardLayout from "./components/layout/Layout/DashboardLayout/DashboardLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <DashboardLayout /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
