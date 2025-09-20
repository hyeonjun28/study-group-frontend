import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  // 임시 데이터 (백엔드 연동 시 실제 데이터 사용)
  const user = {
    profileImage: 'https://via.placeholder.com/100',
  };

  return (
    <div className="profile-container">
      <h1>내 프로필</h1>
      <div className="profile-card">
        <div className="profile-info">
          <img src={user.profileImage} alt="프로필" className="profile-image" />
          <div className="info-text">
            <p><strong>이름:</strong> {user.name}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>가입일:</strong> {user.joinDate}</p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="action-button" onClick={() => navigate('/change-password')}>
            비밀번호 변경
          </button>
          <button className="action-button delete" onClick={() => navigate('/delete-account')}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
