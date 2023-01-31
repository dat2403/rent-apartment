import React, { useMemo } from 'react';
import AppText from '../../../components/AppText/AppText';
import styles from './ApartReviewItem.module.css';
import { Comment } from '../../../model/ApartDetailModel';
import { FAKE_URL } from '../ApartDetailPage';
import { reportCommentAPI } from '../../../api/service';
import useScreenState from '../../../hook/useScreenState';
import AppLoading from '../../../components/AppLoading/AppLoading';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

interface ApartReviewItemProps {
  item: Comment;
}

const ApartReviewItem: React.FC<ApartReviewItemProps> = ({ item }) => {
  const user = useSelector(selectUser);
  const { setLoading, loading, error, setError } = useScreenState();

  const token = localStorage.getItem('accessToken');

  // const showReportButton = useMemo(() => {
  //     return item.userId !== Number(user?.id)
  // }, [user?.id])

  // console.log("HTD11111", user?.id)

  const reportedComment = useMemo(() => {
    return item?.deleted;
  }, [item?.deleted]);

  async function reportComment() {
    try {
      setLoading(true);
      const res = await reportCommentAPI(item.id, token!);
      if (res.status === 201) {
        console.log(res);
        toast.success('Reported successfully!');
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
      toast.error(e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <AppLoading />;
  }

  return (
    <div
      className={
        !reportedComment
          ? styles.itemContainer
          : `${styles.itemContainer} ${styles.deletedCmt}`
      }
    >
      <img alt="" className={styles.image} src={FAKE_URL} />
      <div>
        <AppText font={'semi'} className={styles.name}>
          {item?.user?.name}
        </AppText>

        {reportedComment ? (
          <div className={styles.deletedCmtTextWrapper}>
            <AppText className={styles.deletedCmtText}>
              This comment has been deleted by admin
            </AppText>
          </div>
        ) : (
          <AppText className={styles.content}>{item.comment}</AppText>
        )}

        <AppText className={styles.createdAt}>
          {new Date(item.created_at).toLocaleDateString()}
        </AppText>
      </div>
      {/* {showReportButton && !reportedComment && (
        <div
          onClick={async () => {
            await reportComment();
          }}
          className={styles.report}
        >
          <ReportProblemIcon
            style={{
              fontSize: '20px',
              marginRight: '6px',
            }}
          />
          <AppText>Report</AppText>
        </div>
      )} */}
    </div>
  );
};

export default ApartReviewItem;
