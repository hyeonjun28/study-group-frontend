import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Study.css';

function StudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    console.log("StudyDetailPage - 로컬 스토리지:", posts);

    const currentPost = posts[Number(id)];
    if (currentPost) setPost(currentPost);
    setLoading(false);
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!post) return <p>존재하지 않는 글입니다.</p>;

  const handleJoin = () => {
    const posts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    const updatedPosts = [...posts];
    updatedPosts[Number(id)] = {
      ...post,
      joined: (post.joined || 0) + 1
    };
    localStorage.setItem('studyPosts', JSON.stringify(updatedPosts));
    setPost(updatedPosts[Number(id)]);
    alert('참여 신청 완료!');
  };

  return (
    <div className="study-page-container">
      <h1 className="study-detail-title">{post.title}</h1>
      <p style={{ whiteSpace: 'pre-line', marginBottom: '20px' }}>{post.content}</p>
      <p>참여자 수: {post.joined || 0}</p>

      <div className="button-group">
        <button className="study-page-button" onClick={handleJoin}>참여하기</button>
        <button className="study-page-button cancel" onClick={() => navigate('/study')}>뒤로가기</button>
      </div>
    </div>
  );
}

export default StudyDetailPage;
