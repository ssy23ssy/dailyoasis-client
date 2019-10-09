import React, { useState, useEffect } from 'react';
import axios from 'axios';
import serverApi from 'lib/serverApi';
import history from 'lib/history';

import './EditAddress.scss';
import MiniHeader from 'components/common/MiniHeader';

const EditAddress = () => {
  const [postNum, setPostNum] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setPostNum(user.postNum);
    setAddress(user.address);
    console.log(user);
    
  }, []);

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

  const editAddress = async e => {
    e.preventDefault();

    try {
      const appKey = process.env.REACT_APP_tmapAPI;
      const geoCordingRes = await axios.get(`https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?addressFlag=F00&format=json&fullAddr=${address}&version=1&appKey=${appKey}`);
      const { coordinateInfo } = geoCordingRes.data;
      const { coordinate } = coordinateInfo;
      const longitude = coordinate[0].lon || coordinate[0].newLon;
      const latitude = coordinate[0].lat || coordinate[0].newLat;


      const data = {
        longitude,
        latitude,
        address,
        postNum
      };
      const res = await serverApi('updateAddress', data);

      console.log(res);
      let user = JSON.parse(localStorage.getItem('user'));
      user.postNum = postNum;
      user.address = address;
      user.longitude = longitude;
      user.latitude = latitude;

      localStorage.setItem('user', JSON.stringify(user));
      alert('수정이 완료되었습니다!');
      history.push('/');

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <MiniHeader title="주소수정" />
      <form onSubmit={editAddress} className="editAddressForm">
        <div className="editAddressForm__field">
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
        <div className="editAddressForm__field">
          <button className="edit__BTN">주소 수정</button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;