import apiClient from './client';
import { ApartModel } from '../model/ApartModel';
import { ApartDetailModel } from '../model/ApartDetailModel';
import { AppConfig } from './AppConfig';

export const signUpAPI = (data: any) => {
  return apiClient.post('auth/register', data);
};

export const logInAPI = (email: string, password: string) => {
  return apiClient.post('auth/login', {
    email: email,
    password: password,
  });
};

export const updateProfile = (data: any, token: string) => {
  return apiClient.post('user/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPost = (data: any, token: string) => {
  let myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Access-Control-Allow-Origin', '*');
  myHeaders.append('Content-Type', 'multipart/form-data');
  // let formData = new FormData()
  let formData = new FormData();
  formData.append('file', data.file[0], "Ảnh 1");
  formData.append('file', data.file[1], "Ảnh 2");
  formData.append('file', data.file[2], "Ảnh 3");
  formData.append('file', data.file[3], "Ảnh 4");
  formData.append('title', data.title);
  formData.append('address', data.address);
  formData.append('price', data.price);
  formData.append('detail', data.detail);
  formData.append('area', data.area);
  formData.append("district", "Hai Ba Trung");
  formData.append("university", "HUST");
  formData.append("room_count", "4");

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  return fetch(`${AppConfig.baseURL}posts/`, requestOptions)
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

  return fetch(`${AppConfig.baseURL}posts/${postId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
};

export const deletePostAPI = (postId: string, token: string) => {
  return apiClient.delete(`posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loadAllPost = (data: any) => {
  return apiClient.post<any[]>('posts/all', data);
};

export const loadAllPostByUser = (data: any, token: string, status: number) => {
  return apiClient.post<any[]>(`posts/get-my-posts/${status}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getApartDetail = (apatoId: number) => {
  return apiClient.get<ApartDetailModel>(`posts/${apatoId.toString()}`);
};

export const postReviewApart = (apatoId: string, data: any, token: string) => {
  return apiClient.post(`posts/comment/${apatoId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllReport = (token: string) => {
  return apiClient.get('report', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getReportDetail = (reportId: string, token: string) => {
  return apiClient.get(`report/${reportId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const reportCommentAPI = (commentId: number, token: string) => {
  return apiClient.post(
    `report`,
    {
      commentId: commentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const blockUserHandlerAPI = (userId: string, token?: string) => {
  return apiClient.put(
    `admin/block/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllUsersAPI = (data: any, token: string) => {
  return apiClient.post('admin/all-user', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCommentAPI = (commentId: string, token: string) => {
  return apiClient.put(
    `admin/delete-comment/${commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
