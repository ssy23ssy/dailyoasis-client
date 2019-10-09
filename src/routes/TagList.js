import React from 'react';

import MiniHeader from 'components/common/MiniHeader';
import List from 'components/common/List';
import CityTree from 'components/common/CityTree';

const TagList = () => {
  const tags = [{
    title: '모아보고 싶은 취향을 선택해주세요',
    list: [{
      id: 1,
      name: '눈이_즐거운',
      to: '/tag/1',
    }, {
      id: 2,
      name: '배울_수_있는',
      to: '/tag/2',
    }, {
      id: 3,
      name: '역사가_숨쉬는',
      to: '/tag/3',
    }, {
      id: 4,
      name: '전통이_느껴지는',
      to: '/tag/4',
    }, {
      id: 5,
      name: '생기가_넘치는',
      to: '/tag/5',
    }, {
      id: 6,
      name: '신나고_활동적인',
      to: '/tag/6',
    }, {
      id: 7,
      name: '음악이_있는',
      to: '/tag/7',
    }, {
      id: 8,
      name: '공연과_무대가_있는',
      to: '/tag/8',
    }, {
      id: 9,
      name: '산책하기_좋은',
      to: '/tag/9',
    }, {
      id: 10,
      name: '여유롭게_즐기는',
      to: '/tag/10',
    }, {
      id: 11,
      name: '야경이_아름다운',
      to: '/tag/11',
    }, {
      id: 12,
      name: '분위기_있는',
      to: '/tag/12',
    }, {
      id: 13,
      name: '감성이_있는',
      to: '/tag/13',
    }, {
      id: 14,
      name: '자연_친화적인',
      to: '/tag/14',
    }, {
      id: 15,
      name: '항상_열려있는',
      to: '/tag/15',
    }, {
      id: 16,
      name: '체험할_수_있는',
      to: '/tag/16',
    }, {
      id: 17,
      name: '마음이_경건해지는',
      to: '/tag/17',
    }, {
      id: 18,
      name: '발걸음이_적은',
      to: '/tag/18',
    }],
  }];
  

  return (
    <div style={{position: 'relative'}}>
      <MiniHeader title="취향별로 모아보기" />
      <List setOfList={tags} />
      <CityTree treeWidth={'50px'} />
    </div>
  );
};

export default TagList;