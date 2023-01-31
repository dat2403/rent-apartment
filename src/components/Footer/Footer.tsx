import React from 'react';
import styles from './Footer.module.css';
import AppText from '../AppText/AppText';

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={styles.footerContainer}>
      <AppText className={styles.text} font={'semi'}>
        This is footer
      </AppText>
    </footer>
  );
};

export default Footer;
