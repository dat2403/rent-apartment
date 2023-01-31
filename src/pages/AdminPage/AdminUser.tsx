import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAPI } from '../../api/admin';
import AppLoading from '../../components/AppLoading/AppLoading';
import Title from '../../components/Title';
import {
  endLoading,
  selectLoading,
  selectUserList,
  setUsers,
  startLoading,
} from '../../redux/slices/adminSlice';

interface UserRoleProps {
  role: string;
}

const UserRole: React.FC<UserRoleProps> = (props) => {
  return (
    <Box
      sx={{
        width: '60%',
        m: '0 auto',
        p: '5px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: props.role === 'SELLER' ? '#b772ff' : '#2db7f5',
        borderRadius: '4px',
      }}
    >
      <Typography color="#141414" sx={{ ml: '5px' }}>
        {props.role.toLowerCase()}
      </Typography>
    </Box>
  );
};

const AdminUser: React.FC = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'SĐT',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      renderCell: (params: any) => {
        return <UserRole role={params?.row?.role} />;
      },
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              width: '60%',
              m: '0 auto',
              p: '5px',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: params?.row?.status ? '#87d068' : '#f50',
              borderRadius: '4px',
            }}
          >
            <Typography color="#141414" sx={{ ml: '5px' }}>
              {params?.row?.status ? 'Active' : 'Blocked'}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const userList = useSelector(selectUserList);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const getUsers = async (data: any) => {
    dispatch(startLoading());
    try {
      const res = await getAllUsersAPI(data);
      console.log(res);
      dispatch(setUsers(res.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    getUsers({ searchValue: '' });
  }, []);

  if (loading) return <AppLoading />;

  return (
    <Box m="20px">
      <Title title="Quản lý người dùng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#a4a9fc',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: '#a4a9fc',
          },
        }}
      >
        <DataGrid rows={userList} columns={columns} />
      </Box>
    </Box>
  );
};

export default AdminUser;
