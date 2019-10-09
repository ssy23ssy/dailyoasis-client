import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './WiseSaying.scss';
import tree from 'assets/images/tree.png';

const wiseSaying = [{
  content: '세계는 한 권의 책이다.\n여행하지 않는 사람은 그 책의 한페이지만 읽는 것과 같다.',
  author: '아우구스티누스',
}, {
  content: '여행을 떠날 각오가 되어 있는 사람만이\n자신을 묶고 있는 속박에서 벗어날 수 있다.',
  author: '헤르만 헤세',
}, {
  content: '여행은 정신을 다시 젊어지게 하는 샘이다.',
  author: '안데르센',
}, {
  content: '여행할 목적지가 있다는 것은 좋은 일이다.\n그러나 중요한 것은 여행 자체이다.',
  author: '어슐러 K. 르귄',
}, {
  content: '인생은 짧고 세상은 넓다.\n그러므로 세상 탐험은 빨리 시작하는 것이 좋다.',
  author: '사이먼 레이븐',
}, {
  content: '여행과 변화를 사랑하는 사람은 생명을 가진 사람이다.',
  author: '바그너',
}, {
  content: '바보는 방황을 하고 현명한 사람은 여행을 한다.',
  author: '토마스 폴러',
}];

const WiseSaying = ({ql, close}) => {
  const [ws, setWs] = useState({
    content: '',
    author: '',
  });

  useEffect(() => {
    setWs(wiseSaying[Math.floor((Math.random() * 7))]);
  }, []);


  return (
    <div className="ws__container">
      <div className="ws">
        <div className="close" onClick={close}>X</div>
        <div className="ws__header">
          <h2>어서오세요, 여행자님!</h2>
          {
            ql !== null && (
              ql !== 0 ? (
                <p>
                  {ql}개의 여행이 기다리고 있어요.
                  <br /><br />
                  <Link className="gotoQuest" to="/questmap">바로가기</Link>
                </p>
              ) : (
                <p>
                  오늘의 여행은 여기까지에요.
                  <br />
                  우리 내일 다시 만나요.
                </p>
              )
            )
          }
          
        </div>
        <div className="ws__ws">
          {
            ws.content.split('\n').map(t => {
              return <p className="content" key={t}>{t}</p>;
            })
          }
          <p>-{ws.author}-</p>
        </div>
        <img src={tree} alt="tree" />
      </div>
    </div>
  );
};

export default WiseSaying;