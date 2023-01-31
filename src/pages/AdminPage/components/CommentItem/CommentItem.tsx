import React, { useState } from 'react';
import styles from './CommentItem.module.css';
import AppText from '../../../../components/AppText/AppText';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  blockUserHandlerAPI,
  deleteCommentAPI,
  getReportDetail,
} from '../../../../api/service';
import { deepPurple } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CommentItemProps {
  id: number;
  reporter: string;
  createdAt: string;
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const { id, reporter, createdAt } = props;
  const [showDetail, setShowDetail] = useState(false);
  const [detailComment, setDetailComment] = useState<any>();

  const token = localStorage.getItem('accessToken');

  const viewHandler = async () => {
    try {
      const res = await getReportDetail(id.toString(), token!);
      if (res.status === 200) {
        console.log(res);
        setDetailComment(res.data);
      }
    } catch (e) {
    } finally {
    }
  };
  const blockUserHandler = async (userId: string) => {
    try {
      const res = await blockUserHandlerAPI(userId, token!);
      if (res.status === 200) {
        console.log(res);
        toast.success('Blocked user successfully', {
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

  const deleteComment = async (commentId: string) => {
    try {
      const res = await deleteCommentAPI(commentId, token!);
      if (res.status === 200) {
        toast.success('Deleted comment successfully!');
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
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
              <div className={`${styles.alignRow} ${styles.cursor}`}>
                <AppText>Show detail</AppText>
                <ExpandMoreIcon
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ) : (
              <div className={`${styles.alignRow} ${styles.cursor}`}>
                <AppText>Collapse</AppText>
                <ExpandLessIcon
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {showDetail && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '20px',
            background: 'whitesmoke',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          {/*<AppText>Comment: </AppText>*/}
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: '50px',
              height: '50px',
            }}
          >
            {detailComment?.comment?.user?.name.slice(0, 2).toUpperCase()}
          </Avatar>
          <div
            style={{
              marginLeft: '15px',
              flexGrow: 1,
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

          <div onClick={async () => deleteComment(detailComment?.comment?.id)}>
            <DeleteIcon
              style={{
                fontSize: '25px',
                color: 'red',
                marginRight: '16px',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
