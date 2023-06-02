import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from 'D:/Semtle/LCK_archives/lck_archive_frontend/src/common/images/lCKlogo.png';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import * as cookie from '../../cookie.js';
import './Header.scss';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(props) {
  const [activeMenu, setActiveMenu] = useState(null);

  const [toggleMyProfile, SetToggleMyProfile] = useState(false);
  const toggleArea = () => {
    SetToggleMyProfile((toggleMyProfile) => !toggleMyProfile);
  };
  const access_token = cookie.getCookie('access_token');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  return (
    <header className="header">
      <div className="left-section">
        <Link to="/" className="logo">
          <img className="logoImg" src={logoImage} alt="LCK ARCHIVE" />
        </Link>
        <nav className="navigation">
          <ul className="nav-list">
            <Link
              to="/player"
              className={`nav-item ${activeMenu === 'PLAYER' ? 'active' : ''}`}
              onClick={() => handleMenuClick('PLAYER')}
            >
              PLAYER
            </Link>
            <Link
              to="/team"
              className={`nav-item ${activeMenu === 'TEAMS' ? 'active' : ''}`}
              onClick={() => handleMenuClick('TEAMS')}
            >
              TEAMS
            </Link>
            <Link
              to="/match"
              className={`nav-item ${
                activeMenu === 'SCHEDULE' ? 'active' : ''
              }`}
              onClick={() => handleMenuClick('SCHEDULE')}
            >
              MATCH
            </Link>
          </ul>
        </nav>
      </div>
      <div className="right-section">
        {!access_token ? (
          <Link to="/login" className="login-button">
            <div className="accountCircle">
              <AccountCircleIcon />
            </div>
            <div className="login">로그인</div>
          </Link>
        ) : (
          <div className="myProfileBtnWrapper">
            <button className="myProfileBtn" onClick={toggleArea}>
              MY
            </button>
            {toggleMyProfile && (
              <div className="myProfileWrapper">
                <Link className="adminBtn" to="/Admin">
                  <div className="icon">
                    <AdminPanelSettingsIcon />
                  </div>
                  <div className="text">LCKArcive 관리페이지</div>
                  
                </Link>
                <button
                  className="logoutBtn"
                  onClick={() => {
                    cookie.setCookie('access_token', '');
                    window.location.reload();
                  }}
                >
                  <div className="icon">
                    <LogoutIcon />
                  </div>
                  <div className="text">로그아웃</div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
