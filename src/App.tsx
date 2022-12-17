import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AdminPage from './pages/AdminPage/AdminPage';
import ApartDetailPage from './pages/ApartDetailPage/ApartDetailPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import PostApartPage from './pages/PostApartPage/PostApartPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import './App.css';

const App: React.FC = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <HomePage />,
  //   },
  //   {
  //     path: '/apart-detail/:apartId',
  //     element: <ApartDetailPage />,
  //   },
  //   {
  //     path: '/post-apart',
  //     element: <PostApartPage />,
  //   },
  //   {
  //     path: '/profile',
  //     element: <ProfilePage />,
  //   },
  //   {
  //     path: '/admin',
  //     element: <AdminPage />,
  //   },
  //   {
  //     path: '/edit-post/:apartId',
  //     element: <EditPostPage />,
  //   },
  //   {
  //     path: '/login',
  //     element: <LoginPage />,
  //   },
  // ]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apart-detail/:apartId" element={<ApartDetailPage />} />
          <Route path="/post-apart" element={<PostApartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/edit-post/:apartId" element={<EditPostPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
