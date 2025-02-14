import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout/DashboardLayout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <SignIn /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Layout /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
