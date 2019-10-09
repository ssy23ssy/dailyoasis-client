import React from 'react';
import history from 'lib/history';

import './Footer.scss';

import profile from 'assets/images/profile.png';
import questmap from 'assets/images/questmap.png';
import map from 'assets/images/map.png';
import setting from 'assets/images/setting.png';

const Footer = () => {

  const goto = (goto) => {
    const currentPath = window.location.pathname;

    if (currentPath === goto) {
      return;
    }

    if (goto === '/map') {
      const user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('lastMapPosition', JSON.stringify({
        longitude: user.longitude,
        latitude: user.latitude,
      }));
    }

    history.push(goto);
  }

  const cur = window.location.pathname;

  return (
    <div className="footerNav">
      <div className={'footerNav__item' + (cur === '/' ? ' cur' : '')} onClick={() => goto('/')}>
        <div className="icon">
          <img id="profileIcon" src={profile} alt="profile" />
        </div>
        <div className="footerText">
          PROFILE
        </div>
      </div>
      <div className={'footerNav__item' + (cur === '/questmap' ? ' cur' : '')} onClick={() => goto('/questmap')}>
        <div className="icon">
          <img id="questIcon" src={questmap} alt="questmap" />
        </div>
        <div className="footerText">QUEST</div>
      </div>
      <div className={'footerNav__item' + (cur === '/map' ? ' cur' : '')} onClick={() => goto('/map')}>
        <div className="icon">
          <img id="mapIcon" src={map} alt="map" />
        </div>
        <div className="footerText">MAP</div>
      </div>
      {/* <div className="footerNav__item" onClick={() => goto('/mypage')}>MYPAGE</div> */}
      <div className={'footerNav__item' + (cur === '/setting' ? ' cur' : '')} onClick={() => goto('/setting')}>
        <div className="icon">
          <img id="settingIcon" src={setting} alt="setting" />
        </div>
        <div className="footerText">SETTING</div>
      </div>
    </div>
  );
};

export default Footer;