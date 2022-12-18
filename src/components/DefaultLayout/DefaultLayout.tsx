import React from 'react';
import styles from './DefaultLayout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <main>
        {children}
        {/*<HomeNavBar/>*/}
        {/*<Footer/>*/}
      </main>
    </div>
  );
};

export default DefaultLayout;
