import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from 'D:/Semtle/LCK_archives/lck_archive_frontend/src/common/images/lCKlogo.png';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './Header.scss';

function Header(props) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  return (
    <header className="header">
      <div className="left-section">
        <Link to='/' className="logo"><img className='logoImg' src={logoImage} alt="LCK ARCHIVE" /></Link>
        <nav className="navigation">
          <ul className="nav-list">
            <Link to='/player'
              className={`nav-item ${activeMenu === 'PLAYER' ? 'active' : ''}`}
              onClick={() => handleMenuClick('PLAYER')}
            >
              PLAYER
            </Link>
            <Link to='/team'
              className={`nav-item ${activeMenu === 'TEAMS' ? 'active' : ''}`}
              onClick={() => handleMenuClick('TEAMS')}
            >
              TEAMS
            </Link>
            <Link to='/match'
              className={`nav-item ${activeMenu === 'SCHEDULE' ? 'active' : ''}`}
              onClick={() => handleMenuClick('SCHEDULE')}
            >
              SCHEDULE
            </Link>
          </ul>
        </nav>
      </div>
      <div className="right-section">
        <button className="login-button">
          <div className="accountCircle">
            <AccountCircleIcon />
          </div>
          <div className="login">로그인</div>
        </button>
      </div>
    </header>
  );
};

export default Header;
