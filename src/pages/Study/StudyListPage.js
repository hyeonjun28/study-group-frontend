// StudyListPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Study.css';

function StudyListPage() {
  const navigate = useNavigate();
  
  // 기존 스터디 목록 상태
  const [posts, setPosts] = useState([]);
  
  // 👇 새로 추가된 상태들
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarked, setBookmarked] = useState(() => {
    // localStorage에서 찜 목록을 불러옵니다.
    const saved = localStorage.getItem('bookmarkedStudies');
    return saved ? JSON.parse(saved) : [];
  });

  // 기존 글 불러오기
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    setPosts(savedPosts);
  }, []);

  // 👇 찜 목록이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('bookmarkedStudies', JSON.stringify(bookmarked));
  }, [bookmarked]);

  const handleWriteClick = () => navigate('/study/write');

  // 👇 찜 목록 토글 함수
  const toggleBookmark = (postId) => {
    setBookmarked(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };
  
  // 👇 검색어에 따라 스터디 목록을 필터링합니다.
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="study-page-container">
      <h1>스터디 목록</h1>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* 👇 검색창 추가 */}
        <input
          type="text"
          placeholder="스터디 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
        <button className="study-page-button" onClick={handleWriteClick}>글쓰기</button>
      </div>

      {/* 필터링된 목록을 보여줍니다. */}
      {filteredPosts.length === 0 ? (
        <p>조건에 맞는 글이 없습니다.</p>
      ) : (
        <ul className="study-list">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="study-item"
              // onClick={() => navigate(`/study/${post.id}`)} -> 찜 버튼 클릭 시 중복 실행 방지를 위해 삭제
            >
              <div 
                className="study-item-content" 
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
              </div>

              {/* 👇 찜하기 버튼 추가 */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // li의 클릭 이벤트가 실행되지 않도록 방지
                  toggleBookmark(post.id);
                }}
                className="bookmark-button"
              >
                {bookmarked.includes(post.id) ? '❤️ 찜 취소' : '🤍 찜하기'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyListPage;