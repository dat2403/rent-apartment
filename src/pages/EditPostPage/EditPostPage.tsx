import { Button } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editPost } from '../../api/service';
import AppText from '../../components/AppText/AppText';
import usePost from '../../hook/usePost';
import { selectUser } from '../../redux/slices/authSlice';
import styles from '../PostApartPage/PostApartPage.module.css';

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
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const editPostData = (data: any) => {
    editPost(params.apartId!, data, token!)
      .then((res) => {
        console.log(res);
        console.log('Edited Post successfully');
        toast.success('Edited Post successfully');
        navigate('/');
      })
      .catch((e: any) => {
        console.log(e);
        toast.error(e?.response?.data?.message);
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
