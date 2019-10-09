import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import serverApi from 'lib/serverApi';

import './Profile.scss';
import WiseSaying from 'components/common/WiseSaying';
import Footer from 'components/common/Footer';
import CityTree from 'components/common/CityTree';

import title from 'assets/images/title.png';
import footprint from 'assets/images/footprint.png';
import qdone from 'assets/images/qDone.png';
import qundone from 'assets/images/qUndone.png';


const Main = () => {
  const [currentQuest, setCurrentQuest] = useState([]);
  const [ws, setWs] = useState(false);
  const [ld, setLd] = useState(false);

  const titleList = [{
    img: 'https://api.dailyoasis.shop/media/퀘스트칭호1.png',
    name: '시작이 반이다',
    num: 1,
    text: '퀘스트 완료 1회 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/퀘스트칭호2.png',
    name: '뿌듯한 나날',
    num: 2,
    text: '퀘스트 완료 3회 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/퀘스트칭호3.png',
    name: '기대되는 내일',
    num: 3,
    text: '퀘스트 완료 5회 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/퀘스트칭호4.png',
    name: '매일이 새로워진',
    num: 4,
    text: '퀘스트 완료 7회 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/퀘스트칭호5.png',
    name: '관광지가 거기에 있기에 간다',
    num: 5,
    text: '퀘스트 완료 9회 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/리뷰칭호1.png',
    name: '이타적이시네요',
    num: 6,
    text: '리뷰 작성 1회시',
  }, {
    img: 'https://api.dailyoasis.shop/media/리뷰칭호2.png',
    name: '고마운사람',
    num: 7,
    text: '리뷰 작성 4회시',
  }, {
    img: 'https://api.dailyoasis.shop/media/리뷰칭호3.png',
    name: '개발자가 당신을 좋아합니다',
    num: 8,
    text: '리뷰 작성 6회시'
  }, {
    img: 'https://api.dailyoasis.shop/media/리뷰칭호4.png',
    name: '관광지 전문 블로거',
    num: 9,
    text: '리뷰 작성 8회시',
  }, {
    img: 'https://api.dailyoasis.shop/media/리뷰칭호5.png',
    name: '집필하셔도 되겠는데요?',
    num: 10,
    text: '리뷰 작성 10회시',
  }, {
    img: 'https://api.dailyoasis.shop/media/레벨칭호1.png',
    name: '관광의 세계로 오신것을 환영해요',
    num: 11,
    text: '2레벨 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/레벨칭호2.png',
    name: '시간이 흘러서 여기까지 왔는데',
    num: 12,
    text: '7레벨 달성시',
  }, {
    img: 'https://api.dailyoasis.shop/media/레벨칭호3.png',
    name: '사실 만랩이 시작인거 아시죠',
    num: 13,
    text: '15레벨 달성시',
  }];


  useEffect(() => {
    const wsCheck = sessionStorage.getItem('ws');
    if (wsCheck) {
      // do nothing
    } else {
      setWs(true);
      sessionStorage.setItem('ws', true);
    }

    serverApi('currentQuest')
      .then(res => {
        console.log(res);
        const { CurrentQuest } = res.data;
        setCurrentQuest(CurrentQuest);
        setLd(true);
      })
  }, []);



  const user = JSON.parse(localStorage.getItem('user'));
  const profileImage = localStorage.getItem('userIMG');

  // 경험치 처리
  const expPercent = Math.round(user.exp);
  // const expPercent = Math.round(10 / 140 * 100);
  const expStyle = {
    background:`linear-gradient(90deg, #5cc9b1 ${expPercent}%, #ffffff 0%)`
  };

  // 메인 칭호 처리
  const mainTitle = titleList.find(t => {
    return t.num === user.title_num;
  });

  const undoneQ = [];
  for (let i = 1; i <= currentQuest.length; i++) {
    undoneQ.push(
      <img className="currentQuestList" key={i} src={qundone} alt="undone" />
    )
  }

  const doneQ = [];
  for (let i = currentQuest.length + 1; i <= 3; i++) {
    doneQ.push(
      <img className="currentQuestList" key={i} src={qdone} alt="done" />
    )
  }

  return (
    <div className="profile__container">
      {
         ws && (
          <div className="ws__transition">
            <WiseSaying
              ql={ld ? currentQuest.length : null}
              close={() => setWs(false)} />
          </div>
        )
      }

      <h1 className="header">Daily Oasis</h1>

      <div className="profile__quest">
        {doneQ}{undoneQ}
      </div>
      <div className="profile__main">
        <div>
          <img className="main__character" src={profileImage} alt="my character" />
        </div>
        <div className="main__nickName">
          {user.nickName}
          <Link className="edit" to="/mypage">edit</Link>
        </div>
        {
          user.title_num && (
            <div className="main__title">
              <div className="titleImage__container">
                <img src={mainTitle.img} alt={mainTitle.name} />
              </div>
              <div className="titleName">{mainTitle.name}</div>
            </div>
          )
        }
        <div className="main__level">
          <div className="level__top">
            <div>Lv. {parseInt(user.level)}</div>
          </div>
          <div style={expStyle} className="level__bottom">
            EXP {parseInt(user.exp)}
          </div>
        </div>
      </div>
      <div className="profile__logs">
        <Link to="/title" className="logs__title">
          <div className="logName titleLink">
            <div>
              <img src={title} alt="칭호" />
            </div>
            칭호
          </div>
        </Link>
        <Link to="/footprint" className="logs__doneList">
          <div className="logName footprintLink">
            <div>
              <img src={footprint} alt="발자취" />
            </div>
            발자취
          </div>
        </Link>
      </div>

      <CityTree bottom={'10vh'} treeWidth={'15%'} />

      <Footer />
    </div>
  );
};

export default Main;