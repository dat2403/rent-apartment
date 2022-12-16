import React, { useMemo } from 'react';
import AppText from '../../../components/AppText/AppText';
import styles from './ApartReviewItem.module.css';
import { Comment } from '../../../model/ApartDetailModel';
import { FAKE_URL } from '../ApartDetailPage';
import useAuth from '../../../hook/useAuth';
import { reportCommentAPI } from '../../../api/service';
import useScreenState from '../../../hook/useScreenState';
import { toast } from 'react-toastify';
import AppLoading from '../../../components/AppLoading/AppLoading';

interface ApartReviewItemProps {
  item: Comment;
}

const ApartReviewItem: React.FC<ApartReviewItemProps> = ({ item }) => {
  const { user } = useAuth();
  const { setLoading, loading, error, setError } = useScreenState();

  const showReportButton = useMemo(() => {
    return item.userId !== Number(user?.id);
  }, [user?.id]);

  // console.log("HTD11111", user?.id)

  async function reportComment() {
    try {
      setLoading(true);
      const token = user?.token;
      const res = await reportCommentAPI(item.id, token!);
      if (res.status === 201) {
        console.log(res);
        toast.success('Reported successfully', {
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
  }

  if (loading) {
    return <AppLoading />;
  }

  return (
    <div className={styles.itemContainer}>
      <img alt="" className={styles.image} src={FAKE_URL} />
      <div>
        <AppText font={'semi'} className={styles.name}>
          {item.userId}
        </AppText>
        <AppText className={styles.content}>{item.comment}</AppText>
        <AppText className={styles.createdAt}>
          {new Date(item.created_at).toLocaleDateString()}
        </AppText>
      </div>
      {showReportButton && (
        <div
          onClick={async () => {
            await reportComment();
          }}
          className={styles.report}
        >
          <AppText>Report</AppText>
        </div>
      )}
    </div>
  );
};

export default ApartReviewItem;
