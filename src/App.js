import React from 'react';
import { Switch, Router } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom'
import history from 'lib/history';
import './App.css';

import Door from 'routes/Door';
import Profile from 'routes/Profile';
import FootPrint from 'routes/FootPrint';
import Title from 'routes/Title';
import Login from 'routes/auth/Login';
import SignUp from 'routes/auth/SignUp';
import Map from 'routes/Map';
import QuestMap from 'routes/QuestMap';
import MyPage from 'routes/mypage/MyPage';
import EditInfo from 'routes/mypage/EditInfo';
import EditAddress from 'routes/mypage/EditAddress';
import EditTag from 'routes/mypage/EditTag';
import Activity from 'routes/Activity';
import TagList from 'routes/TagList';
import TagBy from 'routes/TagBy';

import Setting from 'routes/Setting';
import Private from 'routes/Private';
import Term from 'routes/Term';

/*

TODO
- 유저정보수정
- 취향별 액티비티
=> 모든 취향 목록 (취향을 선택해주세요)
=> 해당 취향에 대한 리스트 (미니헤더 붙여서)
=> 액티비티의 태그에도 링크 걸어주기

*/


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <MainDoorRoute exact path="/" door={Door} component={Profile} />
          <LoginRoute exact path="/setting" component={Setting} />
          <Route exact path="/private" component={Private} />
          <Route exact path="/term" component={Term} />
          <LoginRoute exact path="/footprint" component={FootPrint} />
          <LoginRoute exact path="/title" component={Title} />
          <UnLoginRoute exact path="/login" component={Login} />
          <UnLoginRoute exact path="/signup" component={SignUp} />
          <LoginRoute exact path="/map" component={Map} />
          <LoginRoute exact path="/questmap" component={QuestMap} />
          <LoginRoute exact path="/mypage" component={MyPage} />
          <LoginRoute exact path="/editInfo" component={EditInfo} />
          <LoginRoute exact path="/editAddress" component={EditAddress} />
          <LoginRoute exact path="/editTag" component={EditTag} />
          <LoginRoute exact path="/activity/:num" component={Activity} />
          <LoginRoute exact path="/taglist" component={TagList} />
          <LoginRoute exact path="/tag/:num" component={TagBy} />
        </Switch>
      </Router>
    </div>
  );
}

function MainDoorRoute({ component: Component, door: Door, ...rest}) {
  const isLogined = localStorage.getItem('token') ? true : false;
  return isLogined ? (
    <Route {...rest} component={Component} />
  ) : (
    <Route {...rest} component={Door} />
  )
}

function LoginRoute({ component: Component, ...rest }) {
  const isLogined = localStorage.getItem('token') ? true : false
  return (
    <Route
      {...rest}
      render={props =>
        isLogined ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  )
}
function UnLoginRoute({ component: Component, ...rest }) {
  const isUnLogined = localStorage.getItem('token') ? false : true
  return (
    <Route
      {...rest}
      render={props =>
        isUnLogined ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  )
}


export default App;
