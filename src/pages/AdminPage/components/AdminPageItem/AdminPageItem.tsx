import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppText from '../../../../components/AppText/AppText';
import { Post } from '../../../../redux/slices/postSlice';
import styles from './AdminPageItem.module.css';

interface AdminPageItemProps {
  item: Post;
  onDelete: () => void;
}

const AdminPageItem: React.FunctionComponent<AdminPageItemProps> = (props) => {
  const { item, onDelete } = props;
  const navigate = useNavigate();

  const viewHandler = () => {
    navigate(`/apart-detail/${item.id}`);
  };

  return (
    <div className={styles.itemContainer}>
      <img src={item.image[0]} alt={''} className={styles.itemImage} />

      <div className={styles.itemContent}>
        <AppText font={'semi'} className={styles.itemTitle}>
          {item.title}
        </AppText>
        <AppText className={styles.itemDetail}>{item.detail}</AppText>
        <div className={`${styles.alignRow} ${styles.marginView}`}>
          <AppText className={styles.itemRate}>
            {Math.round(item.total_rating)}/5
          </AppText>
          <StarIcon
            style={{
              fontSize: '25px',
              color: 'orange',
            }}
          />
        </div>
      </div>

      <div className={styles.itemViewAndEdit}>
        <div onClick={viewHandler}>
          <VisibilityIcon
            style={{
              color: '#1976d2',
              fontSize: '25px',
            }}
          />
        </div>
        <div onClick={onDelete}>
          <DeleteIcon
            style={{
              color: 'red',
              fontSize: '25px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPageItem;
