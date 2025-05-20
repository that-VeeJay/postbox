import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./pages/Layout/Navbar"));
const Home = lazy(() => import("./pages/Home/Index"));
const Create = lazy(() => import("./pages/Create/Index"));
const Profile = lazy(() => import("./pages/Profile/Index"));
const People = lazy(() => import("./pages/People/Index"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ViewSingle = lazy(() => import("./pages/Home/ViewSinglePost"));

const Loading = () => <div>Loading...</div>;

const LayoutWithSuspense = () => <Layout />;

// const LayoutWithSuspense = () => (
//   <Suspense fallback={<Loading />}>
//     <Layout />
//   </Suspense>
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWithSuspense />,
    children: [
      { path: "", element: <Home /> },
      { path: "create", element: <Create /> },
      { path: "profile", element: <Profile /> },
      { path: "people", element: <People /> },
      { path: "posts/:id", element: <ViewSingle /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
