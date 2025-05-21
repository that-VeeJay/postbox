import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("./layouts/Navbar"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const Create = lazy(() => import("./pages/Post/Create"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
const People = lazy(() => import("./pages/People/Index"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ViewSingle = lazy(() => import("./pages/Post/View"));
const EditPost = lazy(() => import("./pages/Post/Edit"));

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
      { path: "", element: <HomePage /> },
      { path: "create", element: <Create /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "people", element: <People /> },
      { path: "posts/:id", element: <ViewSingle /> },
      { path: "posts/:id/edit", element: <EditPost /> },
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
