import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Study.css';

function StudyListPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('studyPosts')) || [
      { title: "첫 번째 스터디", content: "이것은 테스트 글입니다.", joined: 0 }
    ];
    localStorage.setItem('studyPosts', JSON.stringify(savedPosts));
    setPosts(savedPosts);
  }, []);

  const handleWriteClick = () => navigate('/study/write');

  return (
    <div className="study-page-container">
      <h1>스터디 목록</h1>
      <div style={{ marginBottom: '20px' }}>
        <button className="study-page-button" onClick={handleWriteClick}>글쓰기</button>
      </div>

      {posts.length === 0 ? (
        <p>아직 등록된 글이 없습니다.</p>
      ) : (
        <ul className="study-list">
          {posts.map((post, index) => (
            <li
              key={index}
              className="study-item"
              onClick={() => navigate(`/study/${index}`)}
            >
              <h3>{post.title}</h3>
              <p>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
              {post.joined ? <p>참여자 수: {post.joined}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyListPage;
