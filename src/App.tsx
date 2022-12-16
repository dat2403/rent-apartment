import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ApartDetailPage from './pages/ApartDetailPage/ApartDetailPage';
import PostApartPage from './pages/PostApartPage/PostApartPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/apart-detail/:apartId',
      element: <ApartDetailPage />,
    },
    {
      path: '/post-apart',
      element: <PostApartPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/admin',
      element: <AdminPage />,
    },
    {
      path: '/edit-post/:apartId',
      element: <EditPostPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
