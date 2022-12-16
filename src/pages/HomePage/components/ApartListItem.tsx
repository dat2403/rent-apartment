import React from 'react';
import AppText from '../../../components/AppText/AppText';
import styles from './ApartListItem.module.css';
import { ApartModel } from '../../../model/ApartModel';
import { numberWithCommas } from '../../../utils/utils';
import StarIcon from '@mui/icons-material/Star';

interface ApartListItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  item: ApartModel;
}

const ApartListItem: React.FC<ApartListItemProps> = (props) => {
  const { item } = props;
  return (
    <div {...props} className={styles.itemContainer}>
      <img alt="" className={styles.image} src={item.image[0]} />
      <div className={styles.content}>
        <AppText font={'semi'} className={styles.name}>
          {item.title}
        </AppText>
        <AppText font={'regular'} className={styles.address}>
          {item.address}
        </AppText>
        <div className={styles.itemFooter}>
          <div className={styles.alignRow}>
            <AppText font={'semi'} className={styles.rate}>
              {Math.round(item.total_rating)} / 5
            </AppText>
            <StarIcon
              style={{
                fontSize: '25px',
                color: 'orange',
              }}
            />
          </div>
          <AppText font={'regular'} className={styles.price}>
            {numberWithCommas(Number(item.price))}
          </AppText>
        </div>
      </div>
    </div>
  );
};

export default ApartListItem;
