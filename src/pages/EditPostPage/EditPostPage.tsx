import React, { useEffect } from 'react';
import styles from '../PostApartPage/PostApartPage.module.css';
import AppText from '../../components/AppText/AppText';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { AccessToken } from '../../api/AccessToken';
import { editPost } from '../../api/service';

const EditPostPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useAuth();
  const user = auth.user;
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AccessToken.value = user?.token!;
  }, []);

  const editPostData = (data: any) => {
    editPost(params.apartId!, data, AccessToken.value!)
      .then((res) => {
        console.log(res);
        console.log('Edited Post successfully');
        navigate('/');
      })
      .catch((e) => console.log(e));
  };

  const editPostHandler = (data: any) => {
    console.log(data);
    editPostData(data);
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(editPostHandler)}
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
          {...register('description', { required: true, minLength: 8 })}
          name={'description'}
          placeholder={'Mô tả'}
        />
        {errors.description?.type === 'required' && (
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
          Save Change
        </Button>
      </form>
    </div>
  );
};

export default EditPostPage;
