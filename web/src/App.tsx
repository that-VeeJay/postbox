import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

const Layout = lazy(() => import('./layouts/Navbar'));

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const People = lazy(() => import('./pages/People/Index'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));

const Create = lazy(() => import('./pages/Post/Create'));
const ViewSingle = lazy(() => import('./pages/Post/View'));
const EditPost = lazy(() => import('./pages/Post/Edit'));
const All = lazy(() => import('./pages/Post/All'));

const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));

const PageNotFound = lazy(() => import('./pages/404/PageNotFound'));

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         { index: true, element: <HomePage /> },
         { path: 'create', element: <Create /> },
         { path: 'profile', element: <ProfilePage /> },
         { path: 'people', element: <People /> },
         { path: 'posts/:slug', element: <ViewSingle /> },
         { path: 'posts/:slug/edit', element: <EditPost /> },
         { path: 'posts', element: <All /> },
      ],
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/register',
      element: <Register />,
   },
   {
      path: '*',
      element: <PageNotFound />,
   },
]);

export default function App() {
   return <RouterProvider router={router} />;
}
