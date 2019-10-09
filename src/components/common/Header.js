import React from 'react';
import history from 'lib/history';

import './Header.scss'

const Header = ({current}) => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  }

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  return (
    <div className="header">
      <div className="header__top">
        <h1 className="header__top__item title">Daily Oasis</h1>
        <div className="header__top__item auth" onClick={logout}>로그아웃</div>
      </div>
    </div>
  );
};

export default Header;