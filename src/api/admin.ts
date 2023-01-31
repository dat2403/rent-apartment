import { axiosInstance } from './axios';

export const getAllUsersAPI = (data: any) => {
  return axiosInstance.post('admin/all-user', data);
};

export const getAllReport = () => {
  return axiosInstance.get('report');
};

export const getReportDetail = (reportId: string) => {
  return axiosInstance.get(`report/${reportId}`);
};
