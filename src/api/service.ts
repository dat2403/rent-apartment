import { axiosInstance } from './axios';
import { ApartDetailModel } from '../model/ApartDetailModel';

export const signUpAPI = (data: any) => {
  return axiosInstance.post('auth/register', data);
};

export const logInAPI = (email: string, password: string) => {
  return axiosInstance.post('auth/login', {
    email: email,
    password: password,
  });
};

export const updateProfile = (data: any) => {
  return axiosInstance.post('user/update', data);
};

export const createPost = (data: any, token: string) => {
  let myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Access-Control-Allow-Origin', '*');
  myHeaders.append('Content-Type', 'multipart/form-data');
  // let formData = new FormData()
  let formData = new FormData();
  formData.append('file', data.file[0], 'Ảnh 1');
  formData.append('file', data.file[1], 'Ảnh 2');
  formData.append('file', data.file[2], 'Ảnh 3');
  formData.append('file', data.file[3], 'Ảnh 4');
  formData.append('title', data.title);
  formData.append('address', data.address);
  formData.append('price', data.price);
  formData.append('detail', data.detail);
  formData.append('area', data.area);
  formData.append('district', 'Hai Ba Trung');
  formData.append('university', 'HUST');
  formData.append('room_count', '4');

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  return fetch(`https://apato-server.herokuapp.com/posts/`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const editPost = (postId: string, data: any, token: string) => {
  let myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  let formData = new FormData();
  formData.append('file', data.image[0], data.image[0].name);
  formData.append('title', data.title);
  formData.append('address', data.address);
  formData.append('price', data.price);
  formData.append('detail', data.detail);
  formData.append('area', data.area);

  let requestOptions: RequestInit = {
    method: 'PUT',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  return fetch(
    `https://apato-server.herokuapp.com/posts/${postId}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const deletePostAPI = (postId: string) => {
  return axiosInstance.delete(`posts/${postId}`);
};

export const loadAllPost = (data: any) => {
  return axiosInstance.post<any[]>('posts/all', data);
};

export const loadAllPostByUser = (data: any, status: number) => {
  return axiosInstance.post<any[]>(`posts/get-my-posts/${status}`, data);
};

export const getApartDetail = (apatoId: number) => {
  return axiosInstance.get<ApartDetailModel>(`posts/${apatoId.toString()}`);
};

export const postReviewApart = (apatoId: string, data: any) => {
  return axiosInstance.post(`posts/comment/${apatoId}`, data);
};

export const getAllReport = () => {
  return axiosInstance.get('report');
};

export const getReportDetail = (reportId: string) => {
  return axiosInstance.get(`report/${reportId}`);
};

export const reportCommentAPI = (commentId: number) => {
  return axiosInstance.post(`report`, {
    commentId: commentId,
  });
};

export const blockUserHandlerAPI = (userId: string, token?: string) => {
  return axiosInstance.put(`admin/block/${userId}`, {});
};

export const getAllUsersAPI = (data: any) => {
  return axiosInstance.post('admin/all-user', data);
};

export const deleteCommentAPI = (commentId: string) => {
  return axiosInstance.put(`admin/delete-comment/${commentId}`, {});
};
