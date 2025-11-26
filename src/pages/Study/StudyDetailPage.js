import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postApi from '../../api/postApi'; // 기존 API import 유지
import './Study.css';

function StudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔥 백엔드 /rooms/{id} 에서 가져오기
        const response = await fetch(`/rooms/${id}`);
        
        if (!response.ok) throw new Error("방을 찾을 수 없습니다.");
        
        const data = await response.json();

        // 🔥 여기서도 변수명 변환! (화면 깨짐 방지)
        setPost({
          ...data,
          title: data.name,         // 화면은 title을 기다리니까 name을 넣어줌
          content: data.description // 화면은 content를 기다리니까 description을 넣어줌
        });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!post) return <p>존재하지 않는 글입니다.</p>;

  // 🔥 [추가] 참여하기 버튼 클릭 시 실행될 함수
  const handleJoin = async () => {
    // 1. 현재 로그인한 사용자 아이디 가져오기
    // (로그인 시 localStorage.setItem('username', '아이디')를 했다고 가정)
    const username = localStorage.getItem('username'); 

    if (!username) {
      alert("로그인이 필요한 서비스입니다.");
      // navigate('/login'); // 필요하면 로그인 페이지로 이동
      return;
    }

    if (!window.confirm("이 스터디에 참여하시겠습니까?")) return;

    try {
      // 2. 백엔드에 참여 요청 보내기 (fetch 사용)
      // Controller의 @RequestMapping("/rooms")와 @PostMapping("/{id}/join") 주소 조합
      const response = await fetch(`/rooms/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }), // 백엔드 JoinReq DTO 형식에 맞춤
      });

      // 3. 결과 처리
      const message = await response.text(); // 백엔드에서 보낸 문자열("참여 완료" 등) 받기

      if (response.ok && message === "참여 완료") {
        alert("🎉 참여가 완료되었습니다! 일정 관리 페이지로 이동합니다.");
        navigate("/schedule"); // 일정 관리 페이지 주소 (확인 필요)
      } else {
        alert(message); // "이미 참여한 사용자입니다" 등의 메시지 띄우기
      }

    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  // 기존 삭제 로직
  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    try {
      await postApi.deletePost(id);
      alert("삭제 완료!");
      navigate("/study");
    } catch (err) {
      console.error(err);
      alert("삭제 실패: 본인 글만 삭제할 수 있습니다 ❌");
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

        {/* 🔥 [추가] 참여하기 버튼 (가장 눈에 띄게 배치) */}
        <button
          className="study-page-button join"
          onClick={handleJoin}
          style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '10px' }} // 초록색 스타일
        >
          참여하기
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