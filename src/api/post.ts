import { axiosInstance } from './axios';

export const createPost = (data: any) => {
  return axiosInstance.post('/posts', data);
};
