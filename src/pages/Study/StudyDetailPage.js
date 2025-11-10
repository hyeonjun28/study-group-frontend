import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi';
import './Study.css';

function StudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await postApi.getPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!post) return <p>존재하지 않는 글입니다.</p>;

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await postApi.deletePost(id);
      alert("삭제 완료!");
      navigate("/study");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="study-page-container">
      <h1 className="study-detail-title">{post.title}</h1>

      <p style={{ whiteSpace: 'pre-line', marginBottom: '20px' }}>
        {post.content}
      </p>

      <div className="button-group">

        <button
          className="study-page-button cancel"
          onClick={() => navigate('/study')}
        >
          뒤로가기
        </button>

        <button
          className="study-page-button edit"
          onClick={() => navigate(`/study/edit/${id}`)}
        >
          수정하기
        </button>

        <button
          className="study-page-button delete"
          onClick={handleDelete}
        >
          삭제하기
        </button>

      </div>
    </div>
  );
}

export default StudyDetailPage;
