import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import serverApi from 'lib/serverApi';

import './Activity.scss';
import MiniHeader from 'components/common/MiniHeader';
import ActivityMap from 'components/common/ActivityMap';

import NoImage from 'assets/images/noImage.png';
import starFilled from 'assets/images/star_filled.png';
import activityMap from 'assets/images/activityMap.png';

const Activity = (props) => {
  const [activity, setActivity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [map, setMap] = useState(false);
  

  useEffect(() => {
    serverApi('activityDetail', {activity_num: props.match.params.num})
      .then(res => {
        console.log(res);
        const { Activity, Reviews, ActivityPreference } = res.data;

        const tags = ActivityPreference.map(ap => {
          return ap.preference_num;
        });

        setTags(tags);
        setActivity(Activity);
        setReviews(Reviews);
      })

  }, [props.match.params.num]);

  const makeEvenGrade = (grade) => {
    const star = [];
    for (let i = 0; i < Math.round(grade); i++) {
      star.push((
        <span className="star even">
          <img style={{width: '24px'}} src={starFilled} alt="star" />
        </span>
      ));
    }
    return star;
  }

  return (
    activity === null ? (
      <div>로딩중...</div>
    ) : (
      <div className="activity__container">
        <MiniHeader title={activity.name} />
        <div className="activity__tag">
          {
            tags.map(t => {
              return (
                <div className="tag" key={t.num}>
                  <Link style={{color: '#ffffff'}} to={`/tag/${t.num}`}>{t.name}</Link>
                </div>
              );
            })
          }
        </div>
        <div className="activity__image">
          <img src={activity.img || NoImage} alt={`${activity.name}`} />
        </div>
        
        <div className="activity__info">
          {
            activity.eventTime && (
              <div className="activity__info__itme">
                <p className="activity__info__title">운영시간</p>
                <p className="activity__info__content">{activity.eventTime}</p>
              </div>
            )
          }
          {
            activity.eventEndDate && (
              <div className="activity__info__itme">
                <p className="activity__info__title">기간</p>
                <p className="activity__info__content">{activity.eventStartDate} - {activity.eventEndDate}</p>
              </div>
            )
          }
          {
            activity.discription && (
              <div className="activity__info__itme">
                <p className="activity__info__title">상세설명</p>
                <p className="activity__info__content">{activity.discription}</p>
              </div>
            )
          }
          {
            reviews.length !== 0 && (
              <div className="activity__info__itme">
                <p className="activity__info__title">관광지 별점</p>
                <p className="activity__info__content">
                  {makeEvenGrade(activity.grade)}
                  <br />
                  평균 {activity.grade}점
                </p>
              </div>
            )
          }
        </div>

        <div className="reviewContainer">
          <h3>
            다녀간 이들의 한마디
          </h3>
          {
            reviews.length === 0 ? (
              <div className="noReivews">아직... 고요합니다.</div>
            ) : (
              <div className="yesReviews">
                {
                  reviews.map(r => {
                    const filledStarList = [];
                    for (let i = 1; i <= r.grade; i++) {
                      filledStarList.push(
                        <span
                          key={i}
                          className="star"
                        >
                          <img src={starFilled} alt="star" />
                        </span>
                      )
                    }
      
                    return (
                      <div key={r.num} className="activity__review">
                        <div className="review__item reviewTop">
                          <div className="review__nickname">
                            {r.user_nickName}
                          </div>
                          <div>
                            {(new Date(r.doneTime)).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="review__item">
                          {filledStarList}
                        </div>
                        <div className="review__item reviewContent">
                          <textarea
                            value={r.text}
                            disabled={true}
                            rows="10"
                          ></textarea>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              
            )
          }
        </div>

        <img className="showMapBTN" onClick={() => setMap(true)} src={activityMap} alt="show map" />
        {
          map && (
            <ActivityMap
              close={() => setMap(false)}
              name={activity.name}
              latitude={activity.latitude}
              longitude={activity.longitude} />
          )
        }
      </div>
    )
  );
};

export default Activity;