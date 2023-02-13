import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Layout from '../layout/Layout';
import AdminApart from '../pages/Admin/AdminApart';
import AdminComment from '../pages/Admin/AdminComment';
import AdminTags from '../pages/Admin/AdminTags';
import AdminUser from '../pages/Admin/AdminUser';
import ApartDetail from '../pages/ApartDetail';
import ApartManagement from '../pages/ApartManagement';
import Home from '../pages/Home';
import Login from '../pages/LoginPage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apart-detail/:apartId" element={<ApartDetail />} />
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
