import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReport, getReportDetail } from '../../api/admin';
import AppLoading from '../../components/AppLoading/AppLoading';
import Title from '../../components/Title';
import {
  endLoading,
  getReports,
  selectLoading,
  selectReportList,
  startLoading,
} from '../../redux/slices/adminSlice';

const AdminComment: React.FC = () => {
  const columns = [
    {
      field: 'apatoId',
      headerName: 'Mã phòng trọ',
      flex: 1,
    },
    {
      field: 'comment',
      headerName: 'Bình luận',
      flex: 1,
    },
    {
      field: 'rate',
      headerName: 'Đánh giá',
      flex: 1,
    },
    {
      field: 'commentBy',
      headerName: 'Người bình luận',
      flex: 1,
    },
    {
      field: 'reportBy',
      headerName: 'Người báo cáo',
      flex: 1,
    },
    {
      field: 'checked',
      headerName: 'Đã xử lý',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <input readOnly type="checkbox" checked={params?.row?.checked} />
        );
      },
    },
  ];
  const reportList = useSelector(selectReportList);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const getReportList = async () => {
    dispatch(startLoading());
    try {
      const res = await getAllReport();
      const reportDetails = await Promise.all(
        res.data.map(async (report: any) => {
          const { data } = await getReportDetail(report.id);
          return {
            id: data.id,
            apatoId: data.comment.apatoId,
            comment: data.comment.comment,
            commentBy: data.comment.user.name,
            rate: data.comment.rating,
            reportBy: data.reporter.name,
            checked: data.checked,
          };
        })
      );
      console.log(reportDetails);
      dispatch(getReports(reportDetails));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    getReportList();
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
        <DataGrid rows={reportList} columns={columns} />
      </Box>
    </Box>
  );
};

export default AdminComment;
