import React, { useState, useEffect } from 'react';

import MiniHeader from 'components/common/MiniHeader';

const EditInfo = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwc, setPwc] = useState('');
  const [nickName, setNickName] = useState('');

  const [pwCheck, setPwCheck] = useState(false);
  const [pwcCheck, setPwcCheck] = useState(false);
  const [pwm, setPwm] = useState('');
  const [pwcm, setPwcm] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.username);
    setNickName(user.nickName);
  }, []);


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



  return (
    <div>
      <MiniHeader title="내 정보 수정" />
      <form className="signUp__form">
        <div className="signUp__field">
          <input
            placeholder="이메일"
            type="email"
            id="email"
            name="email"
            value={email}
            disabled={true}
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
          <button className="signUp__BTN">정보수정</button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;