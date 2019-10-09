import React, { useEffect } from 'react';

import MiniHeader from 'components/common/MiniHeader';

const tags = {
  1: '눈이_즐거운',
  2: '배울_수_있는',
  3: '역사가_숨쉬는',
  4: '전통이_느껴지는',
  5: '생기가_넘치는',
  6: '신나고_활동적인',
  7: '음악이_있는',
  8: '공연과_무대가_있는',
  9: '산책하기_좋은',
  10: '여유롭게_즐기는',
  11: '야경이_아름다운',
  12: '분위기_있는',
  13: '감성이_있는',
  14: '자연_친화적인',
  15: '항상_열려있는',
  16: '체험할_수_있는',
  17: '마음이_경건해지는',
  18: '발걸음이_적은',
};

const TagBy = (props) => {
  useEffect(() => {
    console.log(props.match.params.num);
  }, [props.match.params.num]);
  return (
    <div>
      <MiniHeader title={tags[props.match.params.num]} />
    </div>
  );
};

export default TagBy;