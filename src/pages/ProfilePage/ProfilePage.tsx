import React, { useEffect, useMemo, useState } from 'react';
import styles from './Profile.module.css';
import AppText from '../../components/AppText/AppText';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GroupIcon from '@mui/icons-material/Group';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import useAuth from '../../hook/useAuth';
import { loadAllPost } from '../../api/service';
import { ApartModel } from '../../model/ApartModel';
import ProfileInfoItem from './components/ProfileInfoItem/ProfileInfoItem';
import MyPostItem from './components/MyPostItem/MyPostItem';
import { useNavigate } from 'react-router-dom';
import useScreenState from '../../hook/useScreenState';
import AppLoading from '../../components/AppLoading/AppLoading';

export const FAKE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXVon19r-Jyb2zyJhuRGCC6CFHBdk8iaHAA&usqp=CAU';
const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<ApartModel[]>([]);
  const { setLoading, loading, error, setError } = useScreenState();

  const userRole = useMemo(() => {
    switch (user?.role) {
      case 'SELLER': {
        return 'Người cho thuê trọ';
      }
      case 'ADMIN': {
        return 'Admin';
      }
      default: {
        return 'Người dùng';
      }
    }
  }, [user?.role]);

  const fetchData: () => Promise<void> = async () => {
    try {
      setLoading(true);
      const res = await loadAllPost({});
      if (res.status === 201) {
        const newApartList = res.data.map((item) => {
          const newImage = item.image.map((_imageLink) => {
            return 'http://' + _imageLink;
          });
          return {
            ...item,
            image: [...newImage],
          };
        });
        setDataList(newApartList);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().finally(() => {});
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img alt={''} src={FAKE_URL} className={styles.coverImage} />
        <div onClick={() => {}} className={styles.changeCoverImage}>
          <AddAPhotoIcon
            style={{
              fontSize: '30px',
            }}
          />
          <AppText className={styles.changeCoverImgText}>
            Chỉnh sửa ảnh bìa
          </AppText>
        </div>
        <div className={styles.avatarContainer}>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 162,
              height: 162,
              fontSize: 50,
            }}
          >
            {user?.name.toUpperCase().slice(0, 2)}
          </Avatar>
          <AppText font={'semi'} className={styles.fullName}>
            {user?.name}
          </AppText>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.profileContentContainer}>
          <div className={styles.leftScope}>
            <div className={styles.introduce}>
              <AppText font={'bold'} className={styles.label}>
                Giới thiệu
              </AppText>
              <div className={styles.alignRow}>
                <GroupIcon
                  sx={{
                    fontSize: '25px',
                    marginRight: '15px',
                    color: 'gray',
                  }}
                />
                <AppText className={styles.contentText}>
                  Thành viên từ 22/11/2022
                </AppText>
              </div>
            </div>
            <div className={`${styles.introduce} ${styles.recent}`}>
              <AppText font={'bold'} className={styles.label}>
                Hoạt động gần đây
              </AppText>
              <AppText className={styles.contentText}>
                Chưa có hoạt động nào
              </AppText>
            </div>
          </div>

          <div className={styles.rightScope}>
            <AppText font={'bold'} className={styles.label}>
              Thông tin chi tiết
            </AppText>
            <div
              style={{
                background: '#F2F3F4',
                padding: '20px',
                borderRadius: '20px',
              }}
            >
              <ProfileInfoItem title={'Tên người dùng'} content={user?.name} />
              <ProfileInfoItem title={'Email'} content={user?.email} />
              <ProfileInfoItem title={'Số điện thoại'} content={user?.phone} />
              <ProfileInfoItem title={'Địa chỉ'} content={user?.address} />
              <ProfileInfoItem
                itemContainerStyle={styles.itemWithoutBorder}
                title={'Loại tài khoản'}
                content={userRole}
              />
            </div>

            <AppText
              font={'bold'}
              className={`${styles.label} ${styles.textAlign}`}
            >
              Nhà đã đăng
            </AppText>
            <div className={styles.myCreatedPostContainer}>
              {dataList.slice(0, 5).map((item) => {
                return (
                  <MyPostItem
                    onClick={() => navigate(`/apart-detail/${item.id}`)}
                    imageURI={item?.image[0]}
                    postTitle={item?.title}
                    postDescription={item?.detail}
                    rateNumber={item?.total_rating}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
