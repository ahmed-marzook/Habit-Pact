import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout/DashboardLayout/Layout";

const router = createBrowserRouter([{ path: "/", element: <Layout /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
