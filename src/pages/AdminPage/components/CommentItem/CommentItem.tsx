import React, { useState } from 'react';
import styles from './CommentItem.module.css';
import AppText from '../../../../components/AppText/AppText';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { blockUserHandlerAPI, getReportDetail } from '../../../../api/service';
import useAuth from '../../../../hook/useAuth';
import { deepPurple } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';

interface CommentItemProps {
  id: number;
  reporter: string;
  createdAt: string;
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const { id, reporter, createdAt } = props;
  const { user } = useAuth();
  const [showDetail, setShowDetail] = useState(false);
  const [detailComment, setDetailComment] = useState<any>();

  const viewHandler = async () => {
    try {
      const token = user?.token;
      const res = await getReportDetail(id.toString(), token!);
      if (res.status === 200) {
        console.log(res);
        setDetailComment(res.data);
      }
    } catch (e) {
    } finally {
    }
  };

  const deleteHandler = () => {};

  const blockUserHandler = async (userId: string) => {
    try {
      const res = await blockUserHandlerAPI(userId, user?.token!);
      if (res.status === 200) {
        console.log(res);
      }
    } catch (e: any) {
      console.log(e?.response?.data?.message);
      toast.error(e?.response?.data?.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
    }
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemCollapse}>
        <div className={styles.itemContent}>
          <AppText font={'semi'} className={styles.comment}>
            Người report: {reporter}
          </AppText>
          <div className={`${styles.alignRow} ${styles.marginView}`}>
            <AppText className={styles.itemRate}>
              Ngày report: {new Date(createdAt).toLocaleDateString()}
            </AppText>
          </div>
        </div>

        <div className={styles.itemDeleteAndBlock}>
          <div
            onClick={async () => {
              setShowDetail((prev) => !prev);
              await viewHandler();
            }}
          >
            {!showDetail ? (
              <VisibilityIcon
                style={{
                  fontSize: '25px',
                  color: '#1976d2',
                  marginRight: '16px',
                }}
              />
            ) : (
              <VisibilityOffIcon
                style={{
                  fontSize: '25px',
                  color: '#1976d2',
                  marginRight: '16px',
                }}
              />
            )}
          </div>
          <div onClick={deleteHandler}>
            <DeleteIcon
              style={{
                fontSize: '25px',
                color: 'red',
                marginRight: '16px',
              }}
            />
          </div>
          <div
            onClick={async () => {
              await blockUserHandler(detailComment?.comment?.user?.id);
            }}
          >
            <BlockIcon
              style={{
                fontSize: '25px',
                color: 'red',
                marginRight: '16px',
              }}
            />
          </div>
        </div>
      </div>
      {showDetail && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: '20px',
            background: 'red',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          {/*<AppText>Comment: </AppText>*/}
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {detailComment?.comment?.user?.name.slice(0, 2).toUpperCase()}
          </Avatar>
          <div
            style={{
              marginLeft: '15px',
            }}
          >
            <AppText font={'semi'} className={styles.commentUser}>
              {detailComment?.comment?.user?.name}
            </AppText>
            <AppText className={styles.commentText}>
              {detailComment?.comment?.comment}
            </AppText>
            <AppText className={styles.commentDate}>
              {new Date(
                detailComment?.comment?.created_at
              ).toLocaleDateString()}
            </AppText>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
