import React, { useEffect, useMemo } from 'react';
import styles from '../PostApartPage/PostApartPage.module.css';
import AppText from '../../components/AppText/AppText';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { AccessToken } from '../../api/AccessToken';
import { editPost } from '../../api/service';
import { showErrorToast, showSuccessToast } from '../../components/Toast/Toast';
import usePost from '../../hook/usePost';

const EditPostPage: React.FC = () => {
  const params = useParams();
  const { posts } = usePost();
  const currentPost = useMemo(() => {
    return posts.find((item) => item.id === Number(params.apartId));
  }, [params.apartId]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: currentPost?.image[0],
      title: currentPost?.title,
      address: currentPost?.address,
      area: currentPost?.area,
      price: currentPost?.price,
      detail: currentPost?.detail,
    },
  });
  const auth = useAuth();
  const user = auth.user;
  const navigate = useNavigate();

  useEffect(() => {
    AccessToken.value = user?.token!;
  }, []);

  const editPostData = (data: any) => {
    editPost(params.apartId!, data, AccessToken.value!)
      .then((res) => {
        console.log(res);
        console.log('Edited Post successfully');
        showSuccessToast('Edited Post successfully');
        navigate('/');
      })
      .catch((e: any) => {
        console.log(e);
        showErrorToast(e?.response?.data?.message);
      });
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
          {...register('title')}
          name={'title'}
          placeholder={'Title'}
          type={'text'}
        />
        <input
          className={styles.input}
          {...register('address')}
          name={'address'}
          placeholder={'Address'}
          type={'text'}
        />
        <input
          className={styles.input}
          {...register('area')}
          name={'area'}
          placeholder={'Area'}
          type={'text'}
        />
        <input
          className={styles.input}
          {...register('price')}
          name={'price'}
          placeholder={'Price'}
          type={'text'}
        />
        <textarea
          className={styles.textArea}
          {...register('detail')}
          name={'detail'}
          placeholder={'Description'}
        />
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
