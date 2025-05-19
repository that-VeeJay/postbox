import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Index";
import Layout from "./pages/Layout/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Create from "./pages/Posts/Index";
import Profile from "./pages/Profile/Index";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
