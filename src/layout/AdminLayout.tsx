import { Grid, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sm={3} md={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
