import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverApi from 'lib/serverApi';
import history from 'lib/history';

import './SignUp.scss';
import MiniHeader from 'components/common/MiniHeader';
import CityTree from 'components/common/CityTree';
import Loading from 'components/common/Loading';

import c1 from 'assets/images/c1.png';
import c2 from 'assets/images/c2.png';
import c3 from 'assets/images/c3.png';
import c4 from 'assets/images/c4.png';


const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwc, setPwc] = useState('');
  const [nickName, setNickName] = useState('');
  const [postNum, setPostNum] = useState('');
  const [address, setAddress] = useState('');
  const tags = [{
    id: 1,
    tagName: '눈이_즐거운',
  }, {
    id: 2,
    tagName: '배울_수_있는',
  }, {
    id: 3,
    tagName: '역사가_숨쉬는',
  }, {
    id: 4,
    tagName: '전통이_느껴지는',
  }, {
    id: 5,
    tagName: '생기가_넘치는',
  }, {
    id: 6,
    tagName: '신나고_활동적인',
  }, {
    id: 7,
    tagName: '음악이_있는',
  }, {
    id: 8,
    tagName: '공연과_무대가_있는',
  }, {
    id: 9,
    tagName: '산책하기_좋은',
  }, {
    id: 10,
    tagName: '여유롭게_즐기는',
  }, {
    id: 11,
    tagName: '야경이_아름다운',
  }, {
    id: 12,
    tagName: '분위기_있는',
  }, {
    id: 13,
    tagName: '감성이_있는',
  }, {
    id: 14,
    tagName: '자연_친화적인',
  }, {
    id: 15,
    tagName: '항상_열려있는',
  }, {
    id: 16,
    tagName: '체험할_수_있는',
  }, {
    id: 17,
    tagName: '마음이_경건해지는',
  }, {
    id: 18,
    tagName: '발걸음이_적은',
  }];
  const [selectedTags, setSelectedTags] = useState([]);
  const character = ['none', '쿼카', '선인장', '사막여우', '미어캣'];
  const characterImage = ['none', c1, c2, c3, c4];
  const characterDescription = [
    0,
    '바쁜 사회생활로 웃음이 사라진\n우리의 친구 쿼카는 자신의 웃음을 되찾고\n세상에서 가장 행복한 동물이 되기 위해 떠나러 갈 거예요!',
    '화분에만 갇혀 살던 선인장씨는\n더 멋진 선인장이 되기 위해서 이제 밖으로 나갈 차례에요!',
    '우리의 친구 사막 여우는\n크고 기다란 귀가 매력적인 특징이죠!\n호기심이 가득한 사막 여우는 새로운 자극을 찾아 떠날 거예요!',
    '무리에서 벗어난 우리의 친구 미어캣은\n혼자 사는 데 익숙해 지려고 해요.\n이제 집에만 있지 않고 밖을 돌아다니기 위해 떠날 거예요!',
  ];
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  
  const [pwCheck, setPwCheck] = useState(false);
  const [pwcCheck, setPwcCheck] = useState(false);
  const [pwm, setPwm] = useState('');
  const [pwcm, setPwcm] = useState('');



  const foldDaumPostcode = () => {
    var element_wrap = document.getElementById('wrap');
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
  };

  const showAddressWindow = () => {
    var element_wrap = document.getElementById('wrap');
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new window.daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            setPostNum(data.zonecode);
            setAddress(addr);

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_wrap.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize : function(size) {
            element_wrap.style.height = size.height+'px';
        },
        width : '100%',
        height : '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
  };
  
  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePw = e => {
    setPw(e.target.value);
  };

  const handlePwc = e => {
    setPwc(e.target.value);
  };

  const handleNickname = e => {
    setNickName(e.target.value);
  };

  const handlePwm = () => {
    const pwL = pw.length;
    if (pwL < 4 || pwL > 20) {
      setPwm('4~20 자리 사이로 입력해주세요.');
      setPwcCheck(false);
    } else {
      setPwm('올바른 입력입니다.');
      setPwCheck(true);
    }
    // 비밀번호컨펌 또한 처리
    handlePwcm();
  };

  const handlePwcm = () => {
    const pwcL = pwc.length;
    if (pwcL < 4 || pwcL > 20 || pw !== pwc) {
      setPwcm('비밀번호와 일치하지 않습니다.');
      setPwcCheck(false);
    } else {
      setPwcm('올바른 입력입니다.');
      setPwcCheck(true);
    }
  };

  const addTag = tag => {
    if (selectedTags.length >= 5) {
      alert('최대 5개의 태그만 선택가능합니다!');
      return;
    }
    for (let i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i].tagName === tag.tagName) {
        return;
      }
    }
    const newTags = selectedTags.slice();
    newTags.push({
      id: tag.id,
      tagName: tag.tagName,
    });
    setSelectedTags(newTags);
  }

  const removeTag = index => {
    const newTags = selectedTags.slice();
    newTags.splice(index, 1);
    setSelectedTags(newTags);
  }

  const handleCharacter = cnum => {
    setSelectedCharacter(cnum);
  };

  const startLoading = async () => {
    setLoading(true);
  }

  const signUp = async e => {
    e.preventDefault();

    console.log(loading);
    await startLoading();
    console.log(loading);

    if (address === '') {
      alert('주소를 입력해주세요!');
      setLoading(false);
      return;
    }

    if (!pwCheck || !pwcCheck) {
      alert('입력을 확인해주세요!');
      setLoading(false);
      return;
    }

    if (selectedCharacter === 0) {
      alert('캐릭터를 선택해주세요!');
      setLoading(false);
      return;
    }

    let tagData = [];
    for (let t of selectedTags) {
      tagData.push(t.id);
    }


    try {
      const appKey = process.env.REACT_APP_tmapAPI;
      const geoCordingRes = await axios.get(`https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?addressFlag=F00&format=json&fullAddr=${address}&version=1&appKey=${appKey}`);
      const { coordinateInfo } = geoCordingRes.data;
      const { coordinate } = coordinateInfo;
      const longitude = coordinate[0].lon || coordinate[0].newLon;
      const latitude = coordinate[0].lat || coordinate[0].newLat;


      const data = {
        address,
        longitude,
        latitude,
        postNum,
        nickName,
        username: email,
        password: pw,
        character_num: selectedCharacter,
        tag: tagData,
      };
      console.log(data);

      serverApi('signup', data)
        .then(res => {
          console.log(res);
          const { User, UserCharacterImage } = res.data;
          const { token } = User;
          const { img } = UserCharacterImage;

          localStorage.setItem('token', token);
          localStorage.setItem('userIMG', img);
          localStorage.setItem('user', JSON.stringify(User));

          serverApi('makeQuest')
            .then(res2 => {
              alert('회원가입이 완료되었습니다!');
              history.push('/');
            })
        })
        .catch(err => {
          console.log(err);
          alert('중복된 아이디입니다!');
          setLoading(false);
        })

    } catch (err) {
      console.log(err);
      setLoading(false);
    }

  };

  return (
    <div className="signup__container">
      {
        loading && <Loading text={'데일리 오아시스에 오신 것을 환영해요.\n처음으로 당신의 취향에 맞는 관광을 찾아보는 중이에요!'} />
      }
      <MiniHeader />
      <h1 className="signUp__hello">
        데일리 오아시스에 오신 걸 환영해요.<br />
        여행자님의 정보를 알려주실래요?
      </h1>
      <form onSubmit={signUp} className="signUp__form">
        <div className="signUp__field">
          <input
            placeholder="이메일"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmail}
            maxLength="50"
            required
          />
        </div>
        <div className="signUp__field">
          <input
            type="password"
            id="pw"
            name="pw"
            minLength="4"
            maxLength="20"
            placeholder="비밀번호(4~20글자)"
            value={pw}
            onChange={handlePw}
            onBlur={handlePwm}
            required
          />
          <p className={'signUp__field__message' + (pwCheck ? ' good' : ' bad')}>{pwm}</p>
        </div>
        <div className="signUp__field">
          <input
            type="password"
            id="pwc"
            name="pwc"
            minLength="4"
            maxLength="20"
            placeholder="비밀번호 확인"
            value={pwc}
            onChange={handlePwc}
            onBlur={handlePwcm}
            required
          />
          <p className={'signUp__field__message' + (pwcCheck ? ' good' : ' bad')}>{pwcm}</p>
        </div>
        <div className="signUp__field">
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickName}
            onChange={handleNickname}
            placeholder="닉네임(최대 30자)"
            maxLength="30"
            required
          />
        </div>
        <div className="signUp__field">
          <input
            type="text"
            id="postNum"
            value={postNum}
            disabled={true}
            placeholder="우편번호"
          />
          <input
            type="button"
            id="findPostNum"
            onClick={showAddressWindow}
            value="찾기"
          />
          <input
            type="text"
            id="address"
            value={address}
            disabled={true}
            placeholder="주소"
          />
          <div id="wrap" style={{display:'none',border:'1px solid',position:'relative'}}>
            <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style={{cursor:'pointer',position:'absolute',right:'0',top:'-1px',zIndex:'1'}} onClick={foldDaumPostcode} alt="접기 버튼" />
          </div>
        </div>
        <div className="signUp__field">
          <div className="tagContainer">
            <label>당신의 취향은 어떤 것인가요?<br />(최대 5개 선택가능)</label>
            {
              tags.map((tag, index) => {
                return (
                  <div
                    key={index}
                    className="tags"
                    onClick={() => addTag(tag)}
                  >
                    {tag.tagName}
                  </div>
                );
              })
            }
          </div>
          <div className="tagContainer">
            <label>선택된 취향</label>
            {
              selectedTags.length !== 0 ? (
                selectedTags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="tags"
                      onClick={() => removeTag(index)}
                    >
                      {tag.tagName}
                    </div>
                  );
                })
              ) : (
                <p className="noTagText">선택된 취향이 없어요!</p>
              )
            }
          </div>
        </div>
        <div className="signUp__field">
          {
            selectedCharacter === 0 ? (
              <div className="character__container">
                <label>여행을 함께할 친구를 선택해주세요.</label>
                <div style={{marginBottom: '14px'}}>
                  <img className="characterImage" src={characterImage[1]} onClick={() => handleCharacter(1)} alt={character[1]} />
                  <img className="characterImage" src={characterImage[2]} onClick={() => handleCharacter(2)} alt={character[2]} />
                </div>
                <div>
                  <img className="characterImage" src={characterImage[3]} onClick={() => handleCharacter(3)} alt={character[3]} />
                  <img className="characterImage" src={characterImage[4]} onClick={() => handleCharacter(4)} alt={character[4]} />
                </div>
              </div>
            ) : (
              <div>
                <p style={{fontWeight: 'bold'}}>{character[selectedCharacter]}</p>
                <img className="characterImage" style={{border: 'none'}} src={characterImage[selectedCharacter]} alt={`선택된 캐릭터 ${character[selectedCharacter]}`} />
                {
                  characterDescription[selectedCharacter].split('\n').map(t => {
                    return (
                      <p style={{fontSize: '14px', padding: '0 16px', letterSpacing: '-1px'}} key={t}>{t}</p>
                    );
                  })
                }
                <br />
                <input
                  className="reselectBTN"
                  type="button"
                  value="다시 선택"
                  onClick={() => setSelectedCharacter(0)}
                />
              </div>
            )
          }
        </div>
        <div className="signUp__field">
          <button className="signUp__BTN">회원가입</button>
        </div>
      </form>
      <p className="agreeText">
        '회원가입'을 누르시면 데일리 오아시스의<br />
        <strong><Link to="/term">서비스 이용약관</Link></strong> 및 <strong><Link to="/private">개인정보 처리방침</Link></strong>에<br />
        동의하시는 것으로 간주 됩니다.<br />
      </p>
      
      <CityTree treeWidth={'50px'} />
    </div>
  );
};

export default SignUp;
