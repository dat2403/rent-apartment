import React from 'react';
import styles from './AdminPageItem.module.css';
import AppText from '../../../../components/AppText/AppText';
import { ApartModel } from '../../../../model/ApartModel';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hook/useAuth';

interface AdminPageItemProps {
  item: ApartModel;
  onDelete: () => void;
}

const AdminPageItem: React.FunctionComponent<AdminPageItemProps> = (props) => {
  const { item, onDelete } = props;
  const { user } = useAuth();
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
              fontSize: '25px',
              color: '#1976d2',
              marginRight: '16px',
            }}
          />
        </div>
        <div onClick={onDelete}>
          <DeleteIcon
            style={{
              fontSize: '25px',
              color: 'red',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPageItem;
