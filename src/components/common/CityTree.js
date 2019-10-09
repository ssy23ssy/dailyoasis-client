import React from 'react';

import city from 'assets/images/city.png';
import tree from 'assets/images/tree.png';

const CityTree = ({treeWidth, bottom}) => {
  const cityStyle =  {
    width: '100%',
    position: 'absolute',
    left: '0',
    bottom: bottom || '0',
  }
  
  const treeStyle = {
    width: `${treeWidth}`,
    position: 'absolute',
    bottom: bottom || '0',
    right: '6px',
  }
  return (
    <div>
      <img className="mainCity" src={city} style={cityStyle} alt="city" />
      <img className="mainTree" src={tree} style={treeStyle} alt="tree" />
    </div>
  );
};

export default CityTree;