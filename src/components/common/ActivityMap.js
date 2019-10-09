import React, { useEffect } from 'react';
import tmap from 'utils/tmap';

import './ActivityMap.scss';

const ActivityMap = ({name, close, longitude, latitude}) => {
  useEffect(() => {
    tmap({
      longitude,
      latitude,
    });
  }, [latitude, longitude]);
  
  return (
    <div className="am__container">
      <div className="close" onClick={close}>X</div>
      <div className="am__header">
        {name}
      </div>
      <div id="map_div"></div>
    </div>
  );
};

export default ActivityMap;