import React, { useState } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2025-09-27'
  };

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  // 👇 1. 모달(팝업) 창이 보이는지 여부를 관리하는 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 👇 2. 비밀번호 필드를 관리하는 상태들 추가
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };
  
  // 👇 3. 비밀번호 변경 폼 제출 시 실행될 함수 추가
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // (백엔드 없을 시) 시뮬레이션
    alert('비밀번호가 성공적으로 변경되었습니다!');
    setIsModalOpen(false); // 모달 닫기
    // 입력 필드 초기화
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };


  return (
    <div className="profile-container">
      <h1>내 프로필</h1>
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-image-wrapper">
            <img src={profileImage} alt="프로필" className="profile-image" />
            <label htmlFor="profileImageUpload" className="image-upload-button">
              ✏️
            </label>
            <input 
              id="profileImageUpload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
            />
          </div>

          <div className="info-text">
            <p><strong>이름:</strong> {user.name}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>가입일:</strong> {user.joinDate}</p>
          </div>
        </div>
        <div className="profile-actions">
          {/* 👇 4. 기존 버튼의 navigate 기능을 모달 열기로 변경 */}
          <button className="action-button" onClick={() => setIsModalOpen(true)}>
            비밀번호 변경
          </button>
          <button className="action-button logout" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="action-button delete" onClick={() => navigate('/delete-account')}>
            회원 탈퇴
          </button>
        </div>
      </div>

      {/* 👇 5. 모달(팝업) UI 추가 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input 
                type="password" 
                placeholder="현재 비밀번호" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="새 비밀번호" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="새 비밀번호 확인" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              <div className="modal-actions">
                <button type="submit" className="action-button">변경</button>
                <button type="button" className="action-button cancel" onClick={() => setIsModalOpen(false)}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;