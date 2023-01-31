import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

export const signupAPI = (data: any): Promise<AxiosResponse> => {
  return axiosInstance.post('auth/register', {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  });
};

export const loginAPI = (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return axiosInstance.post('auth/login', {
    email: email,
    password: password,
  });
};
