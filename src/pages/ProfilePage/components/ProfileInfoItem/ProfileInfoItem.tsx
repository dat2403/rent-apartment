import React from 'react';
import styles from '../../Profile.module.css';
import AppText from '../../../../components/AppText/AppText';

interface ProfileInfoItemProps {
  title: string;
  content?: string;
  itemContainerStyle?: string;
  editing: boolean;
  onChangeInput: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  content,
  title,
  itemContainerStyle,
  editing,
  onChangeInput,
}) => {
  return (
    <div className={`${styles.itemContainer} ${itemContainerStyle}`}>
      <div className={styles.itemContent}>
        <AppText className={styles.itemTitle} font={'semi'}>
          {title}
        </AppText>
        {!editing ? (
          <AppText className={styles.itemDescription}>{content}</AppText>
        ) : (
          <input
            className={styles.input}
            value={content}
            onChange={onChangeInput}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileInfoItem;
