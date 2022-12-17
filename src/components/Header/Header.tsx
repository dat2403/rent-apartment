import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/imgs/logo1.png';
import useAuth from '../../hook/useAuth';
import ProfileMenu from '../../pages/HomePage/components/ProfileMenu/ProfileMenu';
import SearchInput from './components/SearchInput/SearchInput';
import styles from './Header.module.css';
import './header.css';

const nav = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'About',
    path: '/about',
  },
  {
    text: 'Contact',
    path: '/contact',
  },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [navList, setNavList] = useState(false);

  const navigateToLogIn = () => {
    navigate('/login');
  };
  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? 'small' : 'flex'}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            {/* <h4>
              <span>2</span> My List
            </h4> */}
            {user ? (
              <ProfileMenu
                showProfileMenu={showProfileMenu}
                clickMenuOutside={() => setShowProfileMenu(!showProfileMenu)}
                setShowProfileMenu={() => setShowProfileMenu(!showProfileMenu)}
              />
            ) : (
              <button className="btn1" onClick={navigateToLogIn}>
                <i className="fa fa-sign-out"></i> Sign In
              </button>
            )}
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
    // <div className={styles.headerContainer}>
    //   <div id="logo_header" className={styles.logo_header}>
    //     <img src={Logo} alt="logo" height="60" />
    //   </div>
    //   <SearchInput
    //     value={searchKey}
    //     onChange={(e) => setSearchKey(e.target.value)}
    //   />
    //   {user ? (
    //     <>
    //       <ProfileMenu
    //         showProfileMenu={showProfileMenu}
    //         clickMenuOutside={() => setShowProfileMenu(!showProfileMenu)}
    //         setShowProfileMenu={() => setShowProfileMenu(!showProfileMenu)}
    //       />
    //     </>
    //   ) : (
    //     <Button
    //       onClick={navigateToLogIn}
    //       sx={{
    //         borderRadius: '20px',
    //         padding: '6px 20px',
    //         alignSelf: 'center',
    //       }}
    //       variant="contained"
    //       type={'button'}
    //       style={{
    //         fontSize: '14px',
    //         textTransform: 'none',
    //         justifySelf: 'flex-end',
    //       }}
    //     >
    //       Log in
    //     </Button>
    //   )}
    // </div>
  );
};

export default Header;
