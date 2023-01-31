import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Layout from '../layout/Layout';
import AdminApart from '../pages/AdminPage/AdminApart';
import AdminComment from '../pages/AdminPage/AdminComment';
import AdminTags from '../pages/AdminPage/AdminTags';
import AdminUser from '../pages/AdminPage/AdminUser';
import ApartDetail from '../pages/ApartDetailPage/ApartDetail';
import ApartManagement from '../pages/ApartManagement/ApartManagement';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/LoginPage/Login';
import PostApartPage from '../pages/PostApartPage/PostApartPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="apart-detail/:apartId" element={<ApartDetail />} />
          <Route path="post-apart" element={<PostApartPage />} />
          <Route path="edit-post/:apartId" element={<EditPostPage />} />
          <Route path="apart-management" element={<ApartManagement />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminApart />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="comment-report" element={<AdminComment />} />
          <Route path="tag" element={<AdminTags />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
