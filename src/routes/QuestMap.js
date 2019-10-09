// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import serverApi from 'lib/serverApi';
// import axios from 'axios';
// import tmap from 'utils/tmap';

// import './QuestMap.scss';
// import Footer from 'components/common/Footer';
// import Loading from 'components/common/Loading';
// import Reward from 'components/common/Reward';

// // Tmap api 써봐야 함
// const QuestMap = () => {
//   const [center, setCenter] = useState({
//     longitude: '',
//     latitude: '',
//   });
//   const [quest, setQuest] = useState([]);
//   const [focusedQuest, setFocusedQuest] = useState(null);
//   const [map, setMap] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [questReward, setQuestReward] = useState(null);

//   /* useEffect의 callback이 sync한 이유 */
//   // useEffect는 state나 prop에 대한 훅
//   // 그러므로 state가 여러번 바뀌게 되면 그에 따른 훅이 atomic하게 실행되어야 함.
//   // 근데 async 콜백을 걸면 state가 막 바뀌고 있을 때 각각 변경마다 훅이
//   // 순차적으로 atomic하게 실행된다는 보장이 없어짐
//   // 이게 race condition을 발생시킴
//   useEffect(() => {
//     async function componentDidMount() {

//       const user = JSON.parse(localStorage.getItem('user'));
//       try {

//         const center = {
//           longitude: user.longitude,
//           latitude: user.latitude,
//         };

//         const res = await serverApi('currentQuest');
//         let { CurrentActivity, CurrentQuest } = res.data;


//         let currentQuest = [];
//         CurrentActivity.map(ca => {
//           const dontInfo = CurrentQuest.find((info) => {
//             return info.activity_num === ca.num;
//           });
//           const { num: quest_num, ...infos } = dontInfo;
//           const temp = {
//             ...ca,
//             ...infos,
//             quest_num,
//           };
//           currentQuest.push(temp);
//           return true;
//         });

//         let questMarkers = [];
//         for (let q of currentQuest) {
//           questMarkers.push({
//             longitude: q.longitude,
//             latitude: q.latitude,
//             img: 'img',
//           });
//         }

//         setQuest(currentQuest);
//         setCenter({
//           longitude: center.longitude,
//           latitude: center.latitude,
//         });
//         setMap(tmap(center, questMarkers, true, moveFocusTo));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     componentDidMount();
//   }, []);

//   const moveFocusTo = quest => {
//     if (quest === center || quest === focusedQuest) {
//       setFocusedQuest(null);
//     } else {
//       setFocusedQuest(quest);
//     }
//     let lonlat = new window.Tmap.LonLat(quest.longitude, quest.latitude).transform("EPSG:4326", "EPSG:3857");//좌표 설정
//     map.setCenter(lonlat, 15);
//   };

//   const startLoading = async () => {
//     setLoading(true);
//   }
//   const done = async (focusedQuest) => {
//     if (!window.confirm('퀘스트를 완료하시겠습니까?\nGPS가 꺼져있으면 불가능합니다!')) {
//       return;
//     }

//     await startLoading();

//     if (navigator.geolocation) {
//       setTimeout(() => {
//         navigator.geolocation.getCurrentPosition((pos) => {
//           const cur = {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//           };
//           const dest = {
//             latitude: Number(focusedQuest.latitude),
//             longitude: Number(focusedQuest.longitude),
//           };


//           axios.get(`https://apis.openapi.sk.com/tmap/routes/distance?version=1&appKey=${process.env.REACT_APP_tmapAPI}&startX=${cur.longitude}&startY=${cur.latitude}&endX=${dest.longitude}&endY=${dest.latitude}`)
//             .then(res => {
//               const { distanceInfo } = res.data;
//               const { distance } = distanceInfo;

//               const index = quest.indexOf(focusedQuest);
//               if (distance < 100000) {
//                 // 100미터 이내일 경우 퀘스트 완료

//                 serverApi('finishQuest', { quest_num: focusedQuest.quest_num })
//                   .then(res => {
//                     console.log(res);

//                     const { NewTitle, UpdateUser, NewCharacterImage } = res.data;
//                     const { AlienateActivityExp, QuestFinishExp, TotalExp, ReviewExp } = res.data;


//                     if (NewCharacterImage.img) {
//                       localStorage.setItem('userIMG', NewCharacterImage.img);
//                     }

//                     localStorage.setItem('user', JSON.stringify(UpdateUser));

//                     const newQuest = quest.slice();
//                     newQuest[index].questDone = true;
//                     setQuest(newQuest);
//                     setQuestReward({
//                       NewTitle,
//                       UpdateUser,
//                       EXP: {
//                         AlienateActivityExp,
//                         QuestFinishExp,
//                         TotalExp,
//                         ReviewExp,
//                       },
//                     });

//                     alert('완료 되었습니다!');
//                   })
//                   .catch(err => {
//                     console.log(err);
//                   })
//               } else {
//                 alert('근처 장소까지 도달해주세요!');
//               }
//               setLoading(false);
//             })
//         }, (err) => {
//           alert(err.message);
//           setLoading(false);
//         });
//       }, 5000);
//     } else {
//       alert('gps를 사용할 수 없습니다!');
//       setLoading(false);
//     }
//   };

//   console.log(quest);
//   return (
//     <div>
//       {
//         questReward && (
//           <Reward
//             NewTitle={questReward.NewTitle}
//             UpdateUser={questReward.UpdateUser}
//             EXP={questReward.EXP}
//             setReward={setQuestReward}
//           />
//         )
//       }
//       <div className="quest__map">
//         {
//           focusedQuest !== null && (
//             <div className="focusedQuest">
//               <div className="focusedQuest__name">{focusedQuest.name}</div>
//               {
//                 focusedQuest.questDone ? (
//                   <div className="focusedQuest__menu">
//                     <div className="focusedQuest__menu__item"><Link to={`/activity/${focusedQuest.num}`}>장소프로필</Link></div>
//                   </div>
//                 ) : (
//                     <div className="focusedQuest__menu">
//                       {/* <div>경로안내</div> */}
//                       <div className="focusedQuest__menu__item"><Link to={`/activity/${focusedQuest.num}`}>장소프로필</Link></div>
//                       <div className="focusedQuest__menu__item" onClick={() => done(focusedQuest)}>퀘스트완료!</div>
//                     </div>
//                   )
//               }
//             </div>
//           )
//         }
//         <div className="quest__container">
//           <div
//             onClick={() => moveFocusTo(center)}
//             className="quest__list__item">
//             HOME
//           </div>
//           {
//             quest.map(q => {
//               return (
//                 <div
//                   className={'quest__list__item' + (q.questDone ? ' questDone' : '')}
//                   onClick={() => moveFocusTo(q)}
//                   key={q.num} >
//                   {q.name}
//                 </div>
//               );
//             })
//           }
//         </div>
//         <div id="map_div"></div>
//       </div>
//       <Footer />
//       {
//         loading && <Loading />
//       }
//     </div>
//   );
// };

// export default QuestMap;






import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serverApi from 'lib/serverApi';
import axios from 'axios';
import tmap from 'utils/tmap';

import './QuestMap.scss';
import Footer from 'components/common/Footer';
import Loading from 'components/common/Loading';
import Reward from 'components/common/Reward';

class QuestMap extends Component {
  state = {
    center: {
      longitude: '',
      latitude: '',
    },
    map: null,
    quest: [],
    focusedQuest: null,
    questReward: null,
    loading: false,
  }

  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {

      const center = {
        longitude: user.longitude,
        latitude: user.latitude,
      };

      const res = await serverApi('currentQuest');
      let { CurrentActivity, CurrentQuest } = res.data;


      let currentQuest = [];
      CurrentActivity.map(ca => {
        const dontInfo = CurrentQuest.find((info) => {
          return info.activity_num === ca.num;
        });
        const { num: quest_num, ...infos } = dontInfo;
        const temp = {
          ...ca,
          ...infos,
          quest_num,
        };
        currentQuest.push(temp);
        return true;
      });

      let questMarkers = [];
      for (let q of currentQuest) {
        questMarkers.push({
          ...q,
          // longitude: q.longitude,
          // latitude: q.latitude,
          img: 'img',
        });
      }

      this.setState({
        quest: currentQuest,
        center: {
          longitude: center.longitude,
          latitude: center.latitude,
        },
        map: tmap(center, questMarkers, true, this.moveFocusTo)
      });
    } catch (err) {
      console.log(err);
    }
  }

  moveFocusTo = quest => {
    const { center, focusedQuest, map } = this.state;

    const check = quest === center || quest === focusedQuest;
    if (check) {
      this.setState({
        focusedQuest: null,
      });
    } else {
      this.setState({
        focusedQuest: quest,
      });
    }
    if (check && quest !== center) {
      return;
    }
    let lonlat = new window.Tmap.LonLat(quest.longitude, quest.latitude).transform("EPSG:4326", "EPSG:3857");//좌표 설정
    map.setCenter(lonlat);
  };

  startLoading = async () => {
    this.setState({
      loading: true,
    });
  }
  
  done = async (focusedQuest) => {
    if (!window.confirm('퀘스트를 완료하시겠습니까?\nGPS가 꺼져있으면 불가능합니다!')) {
      return;
    }

    const { quest } = this.state;

    await this.startLoading();

    if (navigator.geolocation) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const cur = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          const dest = {
            latitude: Number(focusedQuest.latitude),
            longitude: Number(focusedQuest.longitude),
          };


          axios.get(`https://apis.openapi.sk.com/tmap/routes/distance?version=1&appKey=${process.env.REACT_APP_tmapAPI}&startX=${cur.longitude}&startY=${cur.latitude}&endX=${dest.longitude}&endY=${dest.latitude}`)
            .then(res => {
              const { distanceInfo } = res.data;
              const { distance } = distanceInfo;

              const index = quest.indexOf(focusedQuest);
              if (distance < 100000) {
                // 100미터 이내일 경우 퀘스트 완료

                serverApi('finishQuest', { quest_num: focusedQuest.quest_num })
                  .then(res => {
                    console.log(res);

                    const { NewTitle, UpdateUser, NewCharacterImage } = res.data;
                    const { AlienateActivityExp, QuestFinishExp, TotalExp, ReviewExp } = res.data;


                    if (NewCharacterImage.img) {
                      localStorage.setItem('userIMG', NewCharacterImage.img);
                    }

                    localStorage.setItem('user', JSON.stringify(UpdateUser));

                    const newQuest = quest.slice();
                    newQuest[index].questDone = true;

                    this.setState({
                      quest: newQuest,
                      questReward: {
                        NewTitle,
                        UpdateUser,
                        EXP: {
                          AlienateActivityExp,
                          QuestFinishExp,
                          TotalExp,
                          ReviewExp,
                        },
                      }
                    });
                    alert('완료 되었습니다!');
                  })
                  .catch(err => {
                    console.log(err);
                  })
              } else {
                alert('근처 장소까지 도달해주세요!');
              }
              this.setState({
                loading: false,
              });
            })
        }, (err) => {
          alert(err.message);
          this.setState({
            loading: false,
          });
        });
      }, 5000);
    } else {
      alert('gps를 사용할 수 없습니다!');
      this.setState({
        loading: false,
      });
    }
  };

  setQuestReward = (qr) => {
    this.setState({
      questReward: qr
    });
  }


  render() {
    const { questReward, focusedQuest, center, quest, loading } = this.state;
    const { done, moveFocusTo, setQuestReward } = this;

    return (
      <div>
        {
          questReward && (
            <Reward
              NewTitle={questReward.NewTitle}
              UpdateUser={questReward.UpdateUser}
              EXP={questReward.EXP}
              setReward={setQuestReward}
            />
          )
        }
        <div className="quest__map">
          {
            focusedQuest !== null && (
              <div className="focusedQuest">
                <div className="focusedQuest__name">{focusedQuest.name}</div>
                {
                  focusedQuest.questDone ? (
                    <div className="focusedQuest__menu">
                      <div className="focusedQuest__menu__item"><Link to={`/activity/${focusedQuest.num}`}>장소프로필</Link></div>
                    </div>
                  ) : (
                      <div className="focusedQuest__menu">
                        {/* <div>경로안내</div> */}
                        <div className="focusedQuest__menu__item"><Link to={`/activity/${focusedQuest.num}`}>장소프로필</Link></div>
                        <div className="focusedQuest__menu__item" onClick={() => done(focusedQuest)}>퀘스트완료!</div>
                      </div>
                    )
                }
              </div>
            )
          }
          <div className="quest__container">
            <div
              onClick={() => moveFocusTo(center)}
              className="quest__list__item home">
              HOME
          </div>
            {
              quest.map(q => {
                return (
                  <div
                    className={'quest__list__item' + (q.questDone ? ' questDone' : '')}
                    onClick={() => moveFocusTo(q)}
                    key={q.num} >
                    {q.name}
                  </div>
                );
              })
            }
          </div>
          <div id="map_div"></div>
        </div>
        <Footer />
        {
          loading && <Loading />
        }
      </div>
    );
  }
}

export default QuestMap;