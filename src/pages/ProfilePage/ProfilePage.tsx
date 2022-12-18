import React, { useEffect, useMemo, useState } from 'react';
import styles from './Profile.module.css';
import AppText from '../../components/AppText/AppText';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GroupIcon from '@mui/icons-material/Group';
import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import useAuth from '../../hook/useAuth';
import { loadAllPost, updateProfile } from '../../api/service';
import { ApartModel } from '../../model/ApartModel';
import ProfileInfoItem from './components/ProfileInfoItem/ProfileInfoItem';
import MyPostItem from './components/MyPostItem/MyPostItem';
import { useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useScreenState from '../../hook/useScreenState';
import AppLoading from '../../components/AppLoading/AppLoading';
import { showErrorToast, showSuccessToast } from '../../components/Toast/Toast';

export const FAKE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXVon19r-Jyb2zyJhuRGCC6CFHBdk8iaHAA&usqp=CAU';
const ProfilePage = () => {
  const { user, saveNewProfile } = useAuth();
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<ApartModel[]>([]);
  const { setLoading, loading, error, setError } = useScreenState();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);

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

  async function updateProfileUser(newInfo: any) {
    const token = user?.token;
    try {
      setLoading(true);
      const res = await updateProfile(newInfo, token!);
      if (res.status === 201) {
        console.log(res);
        saveNewProfile(res.data);
        showSuccessToast('Updated profile successfully!');
      }
    } catch (e: any) {
      showErrorToast(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

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
            {user?.name?.toUpperCase().slice(0, 2)}
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
            <div
              className={`${styles.alignRow} ${styles.alignCenter} ${styles.spaceBetween}`}
            >
              <AppText font={'bold'} className={styles.label}>
                Thông tin chi tiết
              </AppText>
              <div onClick={() => setEditing(true)}>
                {!editing && (
                  <ModeEditIcon
                    style={{
                      fontSize: '25px',
                      cursor: 'pointer',
                    }}
                  />
                )}
              </div>
            </div>
            <div
              style={{
                background: '#F2F3F4',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <ProfileInfoItem
                onChangeInput={(e) => setName(e.target.value)}
                editing={editing}
                title={'Tên người dùng'}
                content={name}
              />
              <ProfileInfoItem
                editing={false}
                onChangeInput={() => {}}
                title={'Email'}
                content={user?.email}
              />
              <ProfileInfoItem
                editing={editing}
                onChangeInput={(e) => setPhone(e.target.value)}
                title={'Số điện thoại'}
                content={phone}
              />
              <ProfileInfoItem
                editing={editing}
                title={'Địa chỉ'}
                onChangeInput={(e) => setAddress(e.target.value)}
                content={address}
              />
              <ProfileInfoItem
                itemContainerStyle={styles.itemWithoutBorder}
                editing={false}
                onChangeInput={() => {}}
                title={'Loại tài khoản'}
                content={userRole}
              />
            </div>

            {editing && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '25px',
                }}
              >
                <Button
                  onClick={() => {
                    //TODO call API
                    setEditing(false);
                  }}
                  style={{
                    fontSize: '1.4rem',
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    marginRight: '10px',
                  }}
                  color={'warning'}
                  variant={'outlined'}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    //TODO call API
                    setEditing(false);
                    await updateProfileUser({
                      name: name,
                      phone: phone,
                      address: address,
                    });
                  }}
                  style={{
                    fontSize: '1.4rem',
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                  }}
                  variant={'outlined'}
                >
                  Save changes
                </Button>
              </div>
            )}

            <AppText
              font={'bold'}
              className={`${styles.label} ${styles.textAlign}`}
            >
              Nhà đã đăng
            </AppText>
            <div className={styles.myCreatedPostContainer}>
              {dataList.length > 0 ? (
                dataList.slice(0, 5).map((item) => {
                  return (
                    <MyPostItem
                      onClick={() => navigate(`/apart-detail/${item.id}`)}
                      imageURI={item?.image[0]}
                      postTitle={item?.title}
                      postDescription={item?.detail}
                      rateNumber={item?.total_rating}
                    />
                  );
                })
              ) : (
                <AppText className={styles.noAvailablePost}>
                  No posts available
                </AppText>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
