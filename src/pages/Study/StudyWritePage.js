import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
import './Study.css';

function StudyWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인한 아이디 가져오기
    const username = localStorage.getItem('username');

    try {
      // 🔥 여기만 바뀝니다! (postApi 대신 fetch 사용)
      const response = await fetch('/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title,        // 백엔드는 'name'을 원함 -> 우리가 가진 'title'을 줌
          description: content, // 백엔드는 'description'을 원함 -> 'content'를 줌
          host: username      // 방장 아이디
        })
      });

      if (response.ok) {
        alert("스터디가 등록되었습니다!");
        navigate('/study'); // 목록으로 이동
      } else {
        alert("등록 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류 발생");
    }
  };

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
            required
          />
        </div>

        <div className="study-page-form-group">
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="15"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="study-page-button">등록</button>
          <button
            type="button"
            className="study-page-button cancel"
            onClick={() => navigate('/study')}
          >
            취소
          </button>
        </div>

      </form>
    </div>
  );
}

export default StudyWritePage;
