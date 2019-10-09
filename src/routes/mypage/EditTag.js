import React, { useState, useEffect } from 'react';
import serverApi from 'lib/serverApi';

import './EditTag.scss';
import MiniHeader from 'components/common/MiniHeader';

const EditTag = (props) => {
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
    tagName: '신나고_활동적인'
  }, {
    id: 7,
    tagName: '음악이_있는'
  }, {
    id: 8,
    tagName: '공연과_무대가_있는'
  }, {
    id: 9,
    tagName: '산책하기_좋은'
  }, {
    id: 10,
    tagName: '여유롭게_즐기는'
  }, {
    id: 11,
    tagName: '야경이_아름다운'
  }, {
    id: 12,
    tagName: '분위기_있는'
  }, {
    id: 13,
    tagName: '감성이_있는'
  }, {
    id: 14,
    tagName: '자연_친화적인'
  }, {
    id: 15,
    tagName: '항상_열려있는'
  }, {
    id: 16,
    tagName: '체험할_수_있는'
  }, {
    id: 17,
    tagName: '마음이_경건해지는'
  }, {
    id: 18,
    tagName: '발걸음이_적은'
  }];
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    serverApi('getTags')
      .then(res => {
        console.log(res);
        const { UserTagList } = res.data;
        const tagList = UserTagList.map(t => {
          return {
            id: t.num,
            tagName: t.name,
          };
        });
        setSelectedTags(tagList);
        
      })
    // setSelectedTags
  }, []);

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
  };

  const removeTag = index => {
    const newTags = selectedTags.slice();
    newTags.splice(index, 1);
    setSelectedTags(newTags);
  };

  const editTag = () => {

    if (selectedTags.length > 5) {
      alert('최대 5개의 태그만 선택가능합니다!');
      return;
    }

    let tagData = [];
    for (let t of selectedTags) {
      tagData.push(t.id);
    }

    serverApi('editTag', {tag: tagData})
      .then(res => {
        console.log(res);
        alert('수정이 완료되었습니다!');
        props.history.push('/');
      })
  }

  return (
    <div>
      <MiniHeader title="태그수정" />
      <div className="editTag__container">
        <div className="tagContainer">
          <h3>전체 태그</h3>
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
          <h3>현재 태그</h3>
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
                <p className="noTagText">선택된 태그가 없습니다!</p>
              )
          }
        </div>
        <button onClick={editTag} className="editTag__BTN">태그수정</button>
      </div>
    </div>
  );
};

export default EditTag;