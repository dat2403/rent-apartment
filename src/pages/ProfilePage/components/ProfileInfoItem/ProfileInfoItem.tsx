import React from 'react';
import styles from '../../Profile.module.css';
import AppText from '../../../../components/AppText/AppText';

interface ProfileInfoItemProps {
  title: string;
  content?: string;
  itemContainerStyle?: string;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  content,
  title,
  itemContainerStyle,
}) => {
  return (
    <div className={`${styles.itemContainer} ${itemContainerStyle}`}>
      <div className={styles.itemContent}>
        <AppText className={styles.itemTitle} font={'semi'}>
          {title}
        </AppText>
        <AppText className={styles.itemDescription}>{content}</AppText>
      </div>
    </div>
  );
};

export default ProfileInfoItem;
