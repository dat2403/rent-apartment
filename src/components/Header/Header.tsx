import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/imgs/logo1.png';
import useAuth from '../../hook/useAuth';
import ProfileMenu from '../../pages/HomePage/components/ProfileMenu/ProfileMenu';
import SearchInput from './components/SearchInput/SearchInput';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const navigateToLogIn = () => {
    navigate('/login');
  };
  return (
    <div className={styles.headerContainer}>
      <div id="logo_header" className={styles.logo_header}>
        <img src={Logo} alt="logo" height="60" />
      </div>
      <SearchInput
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      {user ? (
        <>
          <ProfileMenu
            showProfileMenu={showProfileMenu}
            clickMenuOutside={() => setShowProfileMenu(!showProfileMenu)}
            setShowProfileMenu={() => setShowProfileMenu(!showProfileMenu)}
          />
        </>
      ) : (
        <Button
          onClick={navigateToLogIn}
          sx={{
            borderRadius: '20px',
            padding: '6px 20px',
            alignSelf: 'center',
          }}
          variant="contained"
          type={'button'}
          style={{
            fontSize: '14px',
            textTransform: 'none',
            justifySelf: 'flex-end',
          }}
        >
          Log in
        </Button>
      )}
    </div>
  );
};

export default Header;
