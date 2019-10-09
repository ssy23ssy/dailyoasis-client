import React from 'react';

const style = {
  position: 'fixed',
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(00, 00, 00, 0.5)',
  color: 'white',
  zIndex: '2000',
  top: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const Loading = ({text}) => {
  return (
    <div style={style}>
      <div>
      {
        text ? (
          text.split('\n').map(t => {
            return (
              <div key={t}>{t}</div>
            )
          })
        ) : (
          '잠시만 기다려주세요...'
        )
      }
      </div>
    </div>
  );
};

export default Loading;