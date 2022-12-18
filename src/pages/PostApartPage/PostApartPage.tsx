import React, { useEffect } from 'react';
import styles from './PostApartPage.module.css';
import AppText from '../../components/AppText/AppText';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createPost } from '../../api/service';
import { AccessToken } from '../../api/AccessToken';
import useAuth from '../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import usePost from '../../hook/usePost';
import { showErrorToast, showSuccessToast } from '../../components/Toast/Toast';

const PostApartPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useAuth();
  const user = auth.user;
  // const {pushFakePost} = usePost()
  const navigate = useNavigate();
  const { savePost } = usePost();

  useEffect(() => {
    AccessToken.value = user?.token!;
  }, []);

  const submitPost = (data: any) => {
    createPost(data, AccessToken.value!)
      .then((res) => {
        console.log(res);
        savePost(res);
        console.log('Created Post successfully');
        showSuccessToast('Created Post successfully!');
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        showErrorToast(e?.response?.data?.message);
      });
  };

  const postHandler = (data: any) => {
    console.log(data);
    submitPost(data);
  };
  return (
    <div className={styles.container}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(postHandler)}
      >
        <input
          className={styles.input}
          {...register('image', {
            required: true,
          })}
          name={'image'}
          placeholder={'Ảnh'}
          type={'file'}
        />
        {errors.image?.type === 'required' && (
          <AppText className={styles.errorText} role="alert">
            Image is required
          </AppText>
        )}
        <input
          className={styles.input}
          {...register('title', {
            required: true,
          })}
          name={'title'}
          placeholder={'Tên'}
          type={'text'}
        />
        {errors.title?.type === 'required' && (
          <AppText className={styles.errorText} role="alert">
            Title is required
          </AppText>
        )}
        <input
          className={styles.input}
          {...register('address', {
            required: true,
          })}
          name={'address'}
          placeholder={'Địa chỉ'}
          type={'text'}
        />
        {errors.address?.type === 'required' && (
          <AppText className={styles.errorText} role="alert">
            Address is required
          </AppText>
        )}
        <input
          className={styles.input}
          {...register('area', {
            required: true,
          })}
          name={'area'}
          placeholder={'Diện tích'}
          type={'text'}
        />
        {errors.area?.type === 'required' && (
          <AppText className={styles.errorText} role="alert">
            Area is required
          </AppText>
        )}
        <input
          className={styles.input}
          {...register('price', {
            required: true,
          })}
          name={'price'}
          placeholder={'Giá thuê'}
          type={'text'}
        />
        {errors.price?.type === 'required' && (
          <AppText className={styles.errorText} role="alert">
            Price is required
          </AppText>
        )}
        <textarea
          className={styles.textArea}
          {...register('detail', { required: true, minLength: 8 })}
          name={'detail'}
          placeholder={'Mô tả'}
        />
        {errors.detail?.type === 'required' && (
          <AppText className={styles.errorText} role="alert">
            description is required
          </AppText>
        )}
        <Button
          sx={{
            borderRadius: '10px',
            padding: '10px 0',
            width: '380px',
            alignSelf: 'center',
          }}
          variant="contained"
          type={'submit'}
          style={{
            fontSize: '16px',
            margin: '40px 0',
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostApartPage;
