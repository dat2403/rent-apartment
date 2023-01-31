import { Button, Chip, ListItem, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost } from '../../api/post';
import AppText from '../../components/AppText/AppText';
import { TagData, tagsList } from '../HomePage/HomePage';
import styles from './PostApartPage.module.css';

const PostApartPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [tags, setTags] = useState<TagData[]>(tagsList);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [errorTag, setErrorTag] = useState<boolean>(false);

  const handleAdd = (tag: TagData) => () => {
    setSelectedTags((prev: TagData[]) => [...prev, tag]);
    setTags((tags: TagData[]) => tags.filter((t) => t.id !== tag.id));
  };

  const handleDelete = (tag: TagData) => () => {
    setSelectedTags((tags: TagData[]) => tags.filter((t) => t.id !== tag.id));
    setTags((prev: TagData[]) => [...prev, tag]);
  };

  const submitPost = async (data: any) => {
    // if (selectedTags.length === 0) {
    //   setErrorTag(true);
    //   return;
    // }

    console.log('DATA', data);

    const newData = {
      ...data,
      file: [
        data.image[0],
        data.CMND[0],
        data.imgApart[0],
        data['land-use'][0],
      ],
      tags: selectedTags.map((tag) => tag.id.toString()),

      room_count: '3',
      district: 'Cau Giay',
      university: 'HUST',
    };
    delete newData.image;
    delete newData.CMND;
    delete newData.imgApart;
    delete newData['land-use'];
    // const postData = new FormData();
    // postData.append(
    //   'tags',
    //   selectedTags.map((tag) => tag.id.toString())
    // );
    // postData.append('title', newData.title);
    // postData.append('description', newData.description);
    // postData.append('price', newData.price);
    // postData.append('room_count', newData.room_count);
    // postData.append('district', newData.district);
    // postData.append('university', newData.university);
    // postData.append('address', newData.address);
    // postData.append('area', newData.area);
    // postData.append('detail', newData.detail);
    // for (let i = 0; i < newData.file.length; i++) {
    //   postData.append('file', newData.file[i]);
    // }
    // console.log('NEW DATA', newData);
    // console.log('POST DATA', postData);

    try {
      const res = await createPost(newData);
      console.log(res);

      toast.success('Đăng tải thành công!');
      navigate('/apart-management');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setErrorTag(false);
  }, [selectedTags]);

  return (
    <div className={styles.container}>
      <h3>Yêu cầu đăng tải mới</h3>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(submitPost)}
      >
        <div>
          <label htmlFor="title">
            Tiêu đề <span>*</span>
          </label>
          <input
            className={styles.inputTitle}
            {...register('title', {
              required: true,
            })}
            name="title"
            type="text"
          />
          {errors.title?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập tiêu đề!
            </AppText>
          )}
        </div>
        <h3>Thông tin căn hộ</h3>

        <div>
          <label htmlFor="address">
            Địa chỉ <span>*</span>
          </label>
          <input
            className={styles.inputAddress}
            {...register('address', {
              required: true,
            })}
            name="address"
            type="text"
          />
          {errors.address?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập địa chỉ!
            </AppText>
          )}
        </div>
        <div>
          <label htmlFor="area">
            Diện tích (m2) <span>*</span>
          </label>
          <input
            className={styles.input1}
            {...register('area', {
              required: true,
            })}
            name="area"
            type="number"
          />
          {errors.area?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập diện tích!
            </AppText>
          )}
        </div>
        <div>
          <label htmlFor="inputImage">
            Ảnh chụp giới thiệu phòng <span>*</span>
          </label>
          <input
            className={styles.inputImage}
            {...register('image', {
              required: true,
            })}
            name="image"
            placeholder="Ảnh"
            type="file"
          />
          {errors.image?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa tải lên ảnh căn hộ!
            </AppText>
          )}
        </div>
        <div>
          <label htmlFor="price">
            Giá thuê (đ) <span>*</span>
          </label>
          <input
            className={styles.input1}
            {...register('price', {
              required: true,
            })}
            name="price"
            type="number"
          />
          {errors.price?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập giá!
            </AppText>
          )}
        </div>
        <img src="" alt="" />
        <div>
          <label htmlFor="detail">
            Mô tả <span>*</span>
          </label>
          <textarea
            className={styles.textArea}
            {...register('detail', { required: true, minLength: 3 })}
            name={'detail'}
          />
          {errors.detail?.type === 'required' && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa nhập mô tả!
            </AppText>
          )}
        </div>
        <div>
          <label>
            Tags <span>*</span>
          </label>
          <Paper
            sx={{
              display: selectedTags.length ? 'flex' : 'none',
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              border: '1px solid #e2e8f0',
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {selectedTags.map((tag) => {
              return (
                <ListItem key={tag.id}>
                  <Chip
                    label={tag.label}
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onDelete={handleDelete(tag)}
                  />
                </ListItem>
              );
            })}
          </Paper>
          <Stack direction="row" flexWrap="wrap" mt={1}>
            {tags.map((tag) => (
              <Button
                onClick={handleAdd(tag)}
                key={tag.id}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontSize: 12,
                  mr: 1,
                  mb: 1,
                }}
                color="secondary"
              >
                {tag.label}
              </Button>
            ))}
          </Stack>
          {errorTag && (
            <AppText className={styles.errorText} role="alert">
              Bạn chưa chọn tags!
            </AppText>
          )}
        </div>
        <h3>Minh chứng</h3>
        <h4>
          Để xác thực thông tin phòng bạn đăng tải là chính xác, bạn vui lòng
          cung cấp ảnh chụp các loại giấy tờ sau
        </h4>
        <div className="fake-image-1">
          <label htmlFor="CMND">
            Chứng minh nhân dân <span>*</span>
          </label>
          <input
            {...register('CMND', {
              required: true,
            })}
            className={styles.inputImage}
            name="CMND"
            type="file"
          />
          {/* {errors.image?.type === 'required' && (
                <AppText className={styles.errorText} role="alert">
                  Image is required
                </AppText>
              )} */}
        </div>
        <div className="fake-image-2">
          <label htmlFor="img-apart-">
            Ảnh chụp mặt tiền căn nhà, kèm biển địa chỉ <span>*</span>
          </label>
          <input
            {...register('imgApart', {
              required: true,
            })}
            className={styles.inputImage}
            name="imgApart"
            type="file"
          />
          {/* {errors.image?.type === 'required' && (
                <AppText className={styles.errorText} role="alert">
                  Image is required
                </AppText>
              )} */}
        </div>
        <div className="fake-image-3">
          <label htmlFor="land-use">
            Giấy sở hữu nhà đất <span>*</span>
          </label>
          <input
            {...register('land-use', {
              required: true,
            })}
            className={styles.inputImage}
            name="land-use"
            type="file"
          />
          {/* {errors.image?.type === 'required' && (
                <AppText className={styles.errorText} role="alert">
                  Image is required
                </AppText>
              )} */}
        </div>
        <div>
          <Button
            sx={{
              borderRadius: '10px',
              padding: '10px 0',
              width: '380px',
              alignSelf: 'center',
            }}
            className="button-apart"
            variant="contained"
            type={'submit'}
            style={{
              fontSize: '16px',
              margin: '40px 0',
            }}
          >
            Đăng
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostApartPage;
