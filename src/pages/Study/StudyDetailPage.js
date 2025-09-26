import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Study.css';

function StudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    console.log("StudyDetailPage - 로컬 스토리지:", posts);

    const currentPost = posts[Number(id)];
    if (currentPost) {
      setPost(currentPost);
      setComments(currentPost.comments || []);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!post) return <p>존재하지 않는 글입니다.</p>;

  // ✅ 참여하기
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

  // ✅ 댓글 추가
  const handleAddComment = () => {
    // ✅ 댓글 개별 삭제
const handleDeleteComment = (index) => {
  const updatedComments = comments.filter((_, i) => i !== index);
  setComments(updatedComments);

  const posts = JSON.parse(localStorage.getItem('studyPosts')) || [];
  posts[Number(id)] = { ...post, comments: updatedComments };
  localStorage.setItem('studyPosts', JSON.stringify(posts));
  setPost(posts[Number(id)]);
};
    if (!newComment.trim()) return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    const posts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    posts[Number(id)] = { ...post, comments: updatedComments };
    localStorage.setItem('studyPosts', JSON.stringify(posts));
    setPost(posts[Number(id)]);
    setNewComment("");
  };

  // ✅ 게시글 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 이 글을 삭제하시겠습니까?")) return;

    const posts = JSON.parse(localStorage.getItem('studyPosts')) || [];
    const updatedPosts = posts.filter((_, index) => index !== Number(id));
    localStorage.setItem('studyPosts', JSON.stringify(updatedPosts));

    alert("게시글이 삭제되었습니다.");
    navigate('/study');
  };

  return (
    <div className="study-page-container">
      <h1 className="study-detail-title">{post.title}</h1>
      <p style={{ whiteSpace: 'pre-line', marginBottom: '20px' }}>{post.content}</p>
      <p>참여자 수: {post.joined || 0}</p>

      <div className="button-group">
        <button className="study-page-button" onClick={handleJoin}>참여하기</button>
        <button className="study-page-button cancel" onClick={() => navigate('/study')}>뒤로가기</button>
        <button className="study-page-button delete" onClick={handleDelete}>삭제하기</button>
      </div>

      {/* ✅ 댓글 영역 */}
      <div className="comment-section">
        <h3>댓글</h3>
        <ul>
          {comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <ul>
  {comments.map((c, i) => (
    <li key={i} className="comment-item">
      <span>{c}</span>
      <button className="comment-delete" onClick={() => handleDeleteComment(i)}>❌</button>
    </li>
  ))}
</ul>

        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>등록</button>
      </div>
    </div>
  );
}

export default StudyDetailPage;
