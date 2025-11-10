import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
import './Study.css';

function StudyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await postApi.getPostById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postApi.updatePost(id, {
        title,
        content,
        author: "준수"
      });
      alert('수정 완료!');
      navigate(`/study/${id}`);
    } catch (err) {
      console.error(err);
      alert('수정 실패');
    }
  };

  return (
    <div className="study-page-container">
      <h1>글 수정</h1>
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
            rows="15"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="study-page-button">수정완료</button>
          <button type="button" className="study-page-button cancel" onClick={() => navigate(`/study/${id}`)}>
            취소
          </button>
        </div>

      </form>
    </div>
  );
}

export default StudyEditPage;
