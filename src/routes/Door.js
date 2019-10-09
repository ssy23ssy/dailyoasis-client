import React from 'react';
import { Link } from 'react-router-dom';

import './Door.scss';
import CityTree from 'components/common/CityTree';

const Door = () => {
  return (
    <div>
      <div className="door__top">
        <div>
          <h1>데일리 오아시스</h1>
          <div>일상의 오아시스 같은 소여행 도우미</div>
        </div>
        <CityTree treeWidth={'100px'} />
      </div>
      <div className="door__bottom">
        {/* <div className="door__bottom__item">
          캐러셀 닷
        </div> */}
        <div className="door__bottom__item">
          <Link className="signupBTN" to="/signup">회원가입</Link>
        </div>
        <div className="door__bottom__item already">
          이미 아이디가 있으시다면? <Link className="loginBTN" to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Door;