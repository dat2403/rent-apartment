import React from 'react';
import styles from '../../Profile.module.css';
import AppText from '../../../../components/AppText/AppText';

interface MyPostItemProps {
  imageURI?: string;
  postTitle?: string;
  postDescription?: string;
  rateNumber?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const MyPostItem: React.FunctionComponent<MyPostItemProps> = (props) => {
  const { imageURI, postTitle, postDescription, rateNumber, onClick } = props;
  return (
    <div onClick={onClick} className={styles.myPostItem}>
      <img alt={''} className={styles.myPostImage} src={imageURI} />
      <div className={styles.myPostText}>
        <AppText font={'semi'} className={styles.postTitle}>
          {postTitle}
        </AppText>
        <AppText className={styles.postDescription}>{postDescription}</AppText>
      </div>
      <AppText className={styles.rate}>{Math.round(rateNumber!)}/5</AppText>
    </div>
  );
};

export default MyPostItem;
