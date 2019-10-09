import React from 'react';
import history from 'lib/history';

import './MiniHeader.scss';
import BackArrow from 'assets/svgs/leftarrow.svg';

const MiniHeader = ({title}) => {
  return (
    <div className="miniHeader">
      <div className="miniHeader__btn__container" onClick={() => history.goBack()}>
        <img
          className="miniHeader__btn"
          src={BackArrow}
          alt="back" />
      </div>
      <div className="miniHeader__title">
        {title}
      </div>
    </div>
  );
};

export default MiniHeader;