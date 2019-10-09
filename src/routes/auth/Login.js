import React, { useState } from 'react';
import serverApi from 'lib/serverApi';
import history from 'lib/history';

import './Login.scss';
import MiniHeader from 'components/common/MiniHeader';
import CityTree from 'components/common/CityTree';


const Login = () => {
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');

  const login = e => {
    e.preventDefault();

    serverApi('login', {
      username,
      password: pw,
    })
      .then(res1 => {
        const { token } = res1.data;
        localStorage.setItem('token', token);

        serverApi('userInfo')
          .then(res2 => {
            console.log(res2.data);

            const { User, UserCharacterImage } = res2.data;
            const { img } = UserCharacterImage;
            localStorage.setItem('userIMG', img);
            localStorage.setItem('user', JSON.stringify(User));

            history.push('/');
          })

        
      })
      .catch(err => {
        console.log(err);
        alert('아이디와 비밀번호를 확인해주세요!');
      })
  }

  const handleUsername = e => {
    setUsername(e.target.value);
  }
  const handlePw = e => {
    setPw(e.target.value);
  }

  return (
    <div className="login__container">
      <MiniHeader />
      <h1 className="login__hello">
        다시 와주셨군요 여행자님,<br />
        기다리고 있었어요!
      </h1>
      <form onSubmit={login} className="login__form">
        <div className="login__field">
          <input
            placeholder="이메일"
            type="email"
            name="username"
            onChange={handleUsername}
            required
          />
        </div>
        <div className="login__field">
          <input
            placeholder="비밀번호"
            type="password"
            name="pw"
            onChange={handlePw}
            required
          />
        </div>
        <div className="login__field">
          <button className="loginBTN">로그인</button>
        </div>
      </form>
      
      <CityTree bottom={0} treeWidth={'50px'} />
    </div>
  );
};

export default Login;