import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import serverApi from 'lib/serverApi';

import './FootPrint.scss';
import MiniHeader from 'components/common/MiniHeader';
import Reward from 'components/common/Reward';
import CityTree from 'components/common/CityTree';

import starFilled from 'assets/images/star_filled.png';
import starEmpty from 'assets/images/star_empty.png';

const FootPrint = () => {
  const [quest, setQuest] = useState([]);

  const [reviewQuest, setReviewQuest] = useState(null);
  const [text, setText] = useState('');
  const [grade, setGrade] = useState(0);

  const [reviewReward, setReviewReward] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serverApi('doneQuest')
      .then(res => {
        console.log(res);
        let { DoneActivity, DoneQuest } = res.data;

        let QuestList = [];

        DoneActivity.map(ca => {
          const dontInfo = DoneQuest.find((info) => {
            return info.activity_num === ca.num;
          });
          const { num: quest_num, ...infos } = dontInfo;
          const temp = {
            ...ca,
            ...infos,
            quest_num,
          };
          QuestList.push(temp);
          return true;
        });

        setQuest(QuestList);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, []);

  const handleGrade = grade => {
    setGrade(grade);
  }

  const closeReviewForm = e => {
    setReviewQuest(null);
    setGrade(0);
    setText('');
  }

  const submitReview = e => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    if (grade < 1) {
      alert('장소에 대한 별점을 선택해주세요!');
      return;
    }

    const data = {
      text,
      grade,
      user_nickName: user.nickName,
      activity_num: reviewQuest.activity_num,
    };
    console.log(data);
    serverApi('writeReview', data)
      .then(res => {
        console.log(res);
        reviewQuest.reviewDone = true; // 참조이기 때문에 데이터는 변경되고, 리랜더링은 안됨.
        setReviewQuest(null); // 하지만 여기서 스테이트 바꾸면서 리렌더링이 되는 듯.

        const { NewTitle, UpdateUser, NewCharacterImage } = res.data;
        const { AlienateActivityExp, QuestFinishExp, TotalExp, ReviewExp } = res.data;

        if (NewCharacterImage.img) {
          localStorage.setItem('userIMG', NewCharacterImage.img);
        }
        localStorage.setItem('user', JSON.stringify(UpdateUser));

        setReviewReward({
          NewTitle,
          UpdateUser,
          EXP: {
            AlienateActivityExp,
            QuestFinishExp,
            TotalExp,
            ReviewExp,
          },
        });

        alert('리뷰가 작성되었습니다!');
      })
  }

  // grade 계산
  const filledStarList = [];
  for (let i = 1; i <= grade; i++) {
    filledStarList.push(
      <span
        key={i}
        className="star"
        onClick={() => handleGrade(i)}
      >
        <img src={starFilled} alt="star" />
      </span>
    )
  }

  const emptyStarList = [];
  for (let i = grade + 1; i <= 5; i++) {
    emptyStarList.push(
      <span
        key={i}
        className="star"
        onClick={() => handleGrade(i)}
      >
        <img src={starEmpty} alt="star" />
      </span>
    )
  }

  return (
    <div>
      <MiniHeader title="발자취" />
      {
        reviewReward && (
          <Reward
            NewTitle={reviewReward.NewTitle}
            UpdateUser={reviewReward.UpdateUser}
            EXP={reviewReward.EXP}
            setReward={setReviewReward}
          />
        )
      }

      {
        !loading && (
          quest.length > 0 ? (
            <div className="footprint__container">
              {
                quest.map(q => {
                  return (
                    <div key={q.quest_num} className="footprint">
                      <h3><Link to={`/activity/${q.activity_num}`}>{q.name}</Link></h3>
                      <p>{new Date(q.doneTime).toLocaleDateString()}</p>
                      {
                        !q.reviewDone && (
                          <button className="writeReviewBTN" onClick={() => setReviewQuest(q)}>리뷰쓰기</button>
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div className="noFootprint">
              <div className="text">
                <p>인생은 짧고 세상은 넓다.</p>
                <p>그러므로 세상 탐험은 빨리 시작하는 것이 좋다.</p>
                <p>-사이먼 레이븐-</p>
              </div>
              <CityTree treeWidth={'50px'} />
            </div>
          )
        )
      }

      {
        reviewQuest && (
          <div className="reviewForm__container">
            <form onSubmit={submitReview} className="reviewForm">
              <div className="reviewForm__close" onClick={closeReviewForm}>X</div>
              <h3 className="reviewActivity">{reviewQuest.name}</h3>
              <div className="reviewForm__field">
                {/* <label className="reviewForm__field__label" htmlFor="rate">평점</label> */}
                <br />
                {filledStarList}{emptyStarList}
              </div>
              <div className="reviewForm__field">
                <textarea
                  className="reviewForm__text"
                  maxLength="300"
                  required
                  rows="10"
                  placeholder={`리뷰를 작성해 주세요.\n최대 300자까지 가능합니다.`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
              <div className="reviewForm__field">
                <button>리뷰작성</button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default FootPrint;