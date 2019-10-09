import React from 'react';

import './Reward.scss';

const Reward = ({ NewTitle, UpdateUser, EXP, setReward }) => {
  return (
    <div className="Reward">
      <div className="Reward__close" onClick={() => setReward(null)}>X</div>
      {
        NewTitle.length > 0 && (
          <div className="Reward__title">
            <h3>획득한 칭호</h3>
            {
              NewTitle.map(t => {
                return (
                  <div key={t.num} className="newTitle">
                    <div className="titleImage"><img src={t.img} alt={`${t.name}`} /></div>
                    <div className="titleName">{t.name}</div>
                  </div>
                );
              })
            }
          </div>
        )
      }

      <div className="Reward__level">
        <h3>경험치 {EXP.TotalExp} 획득!</h3>
        {
          EXP.ReviewExp === 0 && (
            <div className="expLog">
              <p>상세</p>
              기본 {EXP.QuestFinishExp}
              {
                EXP.AlienateActivityExp !== 0 && (
                  `, 소외지역 방문 ${EXP.AlienateActivityExp}`
                )
              }
            </div>
          )
        }
        <div className="expUpdate">
          <p>이제 당신은</p>
          <span>
            Lv.{UpdateUser.level} {UpdateUser.exp}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reward;