import React from 'react';

import './MyPage.scss'
import MiniHeader from 'components/common/MiniHeader';
import List from 'components/common/List';
import CityTree from 'components/common/CityTree';

import address from 'assets/svgs/address.svg';
import edit from 'assets/svgs/edit.svg';
import tag from 'assets/svgs/tag.svg';

const MyPage = () => {

  const setOfList = [{
    title: '개인정보',
    list: [{
      name: '내 정보 수정',
      to: '/editInfo',
      icon: edit,
    }, {
      name: '주소 수정',
      to: '/editAddress',
      icon: address,
    }, {
      name: '선호 태그 수정',
      to: '/editTag',
      icon: tag,
    }],
  }];

  return (
    <div className="mypage__container">
      <MiniHeader title="마이페이지" />
      <List setOfList={setOfList} />
      <CityTree treeWidth={'50px'} />
    </div>
  );
};

export default MyPage;