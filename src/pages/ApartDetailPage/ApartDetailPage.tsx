import React, { useEffect, useState } from 'react';
import AppText from '../../components/AppText/AppText';
import styles from './ApartDetailPage.module.css';
import ApartReviewItem from './components/ApartReviewItem';
import { useNavigate, useParams } from 'react-router-dom';
import { ApartDetailModel } from '../../model/ApartDetailModel';
import {
  deletePostAPI,
  getApartDetail,
  postReviewApart,
} from '../../api/service';
import { Button, Modal, Rating } from '@mui/material';
import useAuth from '../../hook/useAuth';
import { numberWithCommas } from '../../utils/utils';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';
import StarIcon from '@mui/icons-material/Star';
import useScreenState from '../../hook/useScreenState';
import AppLoading from '../../components/AppLoading/AppLoading';
import { toast } from 'react-toastify';

export const FAKE_URL =
  'https://cdn.vietnambiz.vn/2020/2/26/cd-15826897012081215793790.jpg';

const ApartDetailPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;
  const [apartDetail, setApartDetail] = useState<ApartDetailModel>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null | undefined>(null);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { setLoading, loading, error, setError } = useScreenState();

  const loadApartDetailPageData = async () => {
    try {
      setLoading(true);
      const res = await getApartDetail(Number(params.apartId));
      if (res.status === 200) {
        const newImageData = res.data.image.map((item) => {
          return 'http://' + item;
        });
        setApartDetail({
          ...res.data,
          image: [...newImageData],
        });
        if (res.data?.creator?.email === user?.email) {
          setCanEdit(true);
        }
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApartDetailPageData().finally(() => {});
  }, [needRefresh]);

  const submitReview = async () => {
    try {
      setLoading(true);
      const res = await postReviewApart(
        params.apartId!,
        {
          comment: comment,
          rating: rating,
        },
        user?.token!
      );
      if (res.status === 201) {
        setNeedRefresh(!needRefresh);
        toast.success('Commented successfully', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
      toast.error(e?.response?.data?.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    try {
      setLoading(true);
      console.log(user?.token);
      const res = await deletePostAPI(params.apartId!, user?.token!);
      console.log(res);
      if (res.status === 200) {
        console.log('Deleted successfully');
        navigate('/');
        toast.success('Deleted successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AppLoading />;
  }

  return (
    <DefaultLayout>
      <div>
        {/*<Header/>*/}
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <div className={`${styles.alignRow} ${styles.spaceBetween}`}>
              <AppText font={'bold'} className={styles.detailBlockTitle}>
                Apartment Detail
              </AppText>
              {canEdit && (
                <div className={styles.alignRow}>
                  <Button
                    variant={'outlined'}
                    onClick={() => {
                      navigate(`/edit-post/${params.apartId}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={'outlined'}
                    onClick={async () => {
                      await deletePost();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.detailBlock}>
              <div className={styles.imageContainer} id="apart_image">
                <img
                  alt=""
                  className={styles.image}
                  src={apartDetail?.image[0]}
                  height="500"
                  width="500"
                />
              </div>
              <div className={styles.info}>
                <div className={styles.infoHeader}>
                  <div>
                    <AppText
                      font={'semi'}
                      className={`${styles.detail} ${styles.noMargin}`}
                    >
                      Name:{' '}
                    </AppText>
                    <AppText className={styles.value}>
                      {apartDetail?.title}
                    </AppText>
                  </div>
                  <div className={styles.alignRow}>
                    <AppText font={'semi'} className={styles.rate}>
                      {Math.round(apartDetail?.total_rating!)} / 5
                    </AppText>
                    <StarIcon
                      style={{
                        fontSize: '25px',
                        color: 'orange',
                      }}
                    />
                  </div>
                </div>
                <AppText font={'semi'} className={styles.detail}>
                  Address:{' '}
                </AppText>
                <AppText className={styles.value}>
                  {apartDetail?.address}
                </AppText>
                <AppText font={'semi'} className={styles.detail}>
                  Description:{' '}
                </AppText>
                <AppText className={styles.value}>
                  {apartDetail?.detail}
                </AppText>
                <AppText font={'semi'} className={styles.detail}>
                  Price:{' '}
                </AppText>
                <AppText className={styles.value}>
                  {numberWithCommas(Number(apartDetail?.price))} VND
                </AppText>
                <div onClick={() => navigate('/profile')}>
                  <AppText font={'semi'} className={styles.detail}>
                    Created by {apartDetail?.creator.name}
                  </AppText>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.reviewContainer}>
            {/*//Comment*/}
            <AppText font={'bold'} className={styles.detailBlockTitle}>
              Reviews
            </AppText>
            <Rating
              name="simple-controlled"
              style={{
                marginTop: '12px',
                fontSize: '40px',
              }}
              size="large"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <textarea
              name="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={'Comment'}
              onKeyPress={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  await submitReview();
                  setRating(null);
                  setComment('');
                }
              }}
              className={styles.cmtField}
            />
            <div className={styles.cmtList}>
              {apartDetail?.comments?.map((item) => {
                return <ApartReviewItem key={item.id} item={item} />;
              })}
            </div>
          </div>
          <Modal
            open={showConfirmDelete}
            onClose={() => setShowConfirmDelete(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                flex: 1,
                transform: 'translate(-50%, -50%)',
                width: 400,
                height: 200,
                border: '1px solid gray',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0 3px 8px',
                background: 'white',
                borderRadius: '20px',
              }}
            >
              <AppText>Do you want to delete this post permanently?</AppText>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '30px',
                }}
              >
                <Button
                  onClick={() => setShowConfirmDelete(false)}
                  style={{
                    marginRight: '30px',
                    fontSize: '1.6rem',
                    textTransform: 'none',
                  }}
                  variant={'contained'}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    await deletePost();
                  }}
                  style={{
                    fontSize: '1.6rem',
                    textTransform: 'none',
                  }}
                  color={'error'}
                  variant={'contained'}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default ApartDetailPage;
