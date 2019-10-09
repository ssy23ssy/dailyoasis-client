import React from 'react';

import './Setting.scss';
import List from 'components/common/List';
import CityTree from 'components/common/CityTree';
import Footer from 'components/common/Footer';

import right from 'assets/svgs/rightarrow.svg';
import logoutIcon from 'assets/svgs/logout.svg';

const Setting = (props) => {
  const logout = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }

    localStorage.clear();
    sessionStorage.clear();
    props.history.push('/');
  }
  const setOfList = [{
    title: '서비스정보',
    list: [{
      name: '개인정보 처리방침',
      to: '/private',
      icon: right,
    }, {
      name: '서비스 이용약관',
      to: '/term',
      icon: right,
    }],
  }, {
    title: '',
    list: [{
      name: '로그아웃',
      icon: logoutIcon,
      onclick: logout,
    }],
  }];

  return (
    <div className="setting__container">
      <List title="설정" setOfList={setOfList} />
      <CityTree treeWidth={'15%'} />
      <Footer />
    </div>
  );
};

export default Setting;