// StudyListPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Study.css';

function StudyListPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('studyPosts')) || [];
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
          {posts.map((post) => (
            <li
              key={post.id}
              className="study-item"
              onClick={() => navigate(`/study/${post.id}`)}
            >
              <div className="study-item-header">
                <h3 className="study-item-title">{post.title}</h3>
                <span className="study-item-status">
                  {post.isJoined ? "참여중" : "모집중"}
                </span>
              </div>
              <p>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</p>
              <p>참여자 수: {post.joinedCount || 0}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyListPage;
