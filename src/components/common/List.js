import React from 'react';
import { Link } from 'react-router-dom';

import './List.scss';


const List = ({title, setOfList}) => {
  return (
    <div>
      {
        title !== '' && (
          <div className="list__title">
            {title}
          </div>
        )
      }
      <div className="list__container">
        {
          setOfList.map(listChunk => {
            return (
              <div key={listChunk.title} className="list__chunk">
                <div className="list__chunk__title">{listChunk.title}</div>
                {
                  listChunk.list.map(l => {
                    return (
                      l.onclick ? (
                        <div key={l.name} className="list__item" onClick={l.onclick}>
                          <span>{l.name}</span>
                          {
                            l.icon && <img className="list__icon" src={l.icon} alt={l.name} />
                          }
                        </div>
                      ) : (
                        <Link key={l.name} to={l.to}>
                          <div className="list__item">
                            <span>{l.name}</span>
                            {
                              l.icon && <img className="list__icon" src={l.icon} alt={l.name} />
                            }
                          </div>
                        </Link>
                      )
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default List;