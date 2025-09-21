import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Study.css';

function StudyWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedPosts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    const newPost = { title, content, joined: 0 };
    savedPosts.unshift(newPost);
    localStorage.setItem('studyPosts', JSON.stringify(savedPosts));

    alert('글이 등록되었습니다!');
    navigate(`/study/0`); // 등록 후 상세 페이지 이동
  };

  const handleCancel = () => navigate('/study');

  return (
    <div className="study-page-container">
      <h1>스터디 글쓰기</h1>
      <form onSubmit={handleSubmit} className="study-page-form">
        <div className="study-page-form-group">
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목에 핵심 내용을 요약해보세요."
            required
          />
        </div>
        <div className="study-page-form-group">
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`[개발 스터디 모집 내용 예시]\n스터디 주제 :\n스터디 목표 :\n예상 스터디 일정(횟수) :\n예상 커리큘럼 간략히 :\n예상 모집인원 :\n스터디 소개와 개설 이유 :\n스터디 관련 주의사항 :\n스터디에 지원할 수 있는 방법 :\n참고 사항 :`}
            rows="15"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="study-page-button">등록</button>
          <button type="button" className="study-page-button cancel" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default StudyWritePage;
