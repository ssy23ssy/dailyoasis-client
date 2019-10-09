import React, { useState, useEffect} from 'react';
import serverApi from 'lib/serverApi';

import './Title.scss';
import MiniHeader from 'components/common/MiniHeader';

const Title = () => {
  const [titleList, setTitleList] = useState([]);
  const [myTitle, setMyTitle] = useState(null);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));
    setMyTitle(user.title_num);

    serverApi('getTitleList')
      .then(res => {
        console.log(res);
        const { TitleList } = res.data;

        serverApi('getMyTitle')
          .then(res2 => {
            console.log(res2);

            const { UserTitleList } = res2.data;

            setTitleList(TitleList.map(t => {
              const isAchieved = UserTitleList.find(title => title.num === t.num);
              return {
                ...t,
                achieved: isAchieved ? true : false,
              };
            }));
          })
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const changeTitle = (t_num) => {
    const data = {
      title: t_num
    };
    serverApi('changeTitle', data)
      .then(res => {
        console.log(res);

        let user = JSON.parse(localStorage.getItem('user'));
        user.title_num = t_num;

        localStorage.setItem('user', JSON.stringify(user));
        setMyTitle(t_num);
        alert('대표 칭호가 변경되었습니다!');
      })
  }

  console.log(titleList);
  return (
    <div>
      <MiniHeader title="칭호" />
      <div className="title__container">
        {
          titleList.map(t => {
            return (
              <div className={'title'} key={t.num}>
                {
                  !t.achieved && (
                    <div className="noAchievement">
                      아직 획득하지 못한 칭호입니다!
                    </div>
                  )
                }
                {
                  t.num === myTitle && (
                    <div className="mainTitle">(대표 칭호)</div>
                  )
                }
                <div className="titleImage">
                  <img src={t.img} alt={t.name} />
                </div>
                <div className="titleName">{t.name}</div>
                <div className="titleRequirement">
                  <p>달성조건</p>
                  <p>{t.text || ''}</p>
                </div>
                {
                  (t.num !== myTitle && t.achieved) && (
                    <button onClick={() => changeTitle(t.num)} className="titleBTN">대표업적으로 설정</button>
                  )
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Title;