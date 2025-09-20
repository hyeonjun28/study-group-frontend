import React, { useState } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const checkPasswordConditions = (pwd) => {
    const noSpaces = pwd.replace(/\s/g, '');
    return {
      length: noSpaces.length >= 8 && noSpaces.length <= 32,
      type: [/[a-zA-Z]/.test(noSpaces), /[0-9]/.test(noSpaces), /[!@#$%^&*(),.?":{}|<>]/.test(noSpaces)].filter(Boolean).length >= 2,
      repeat: !(/([a-zA-Z0-9!@#$%^&*(),.?":{}|<>])\1\1/.test(noSpaces))
    };
  };

  const conditions = checkPasswordConditions(newPassword);

  const getSymbol = (condition) => {
    if (newPassword === '') return '✔️';
    return condition ? '✅' : '❌';
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!conditions.length || !conditions.type || !conditions.repeat) {
      alert('비밀번호 조건을 확인하세요.');
      return;
    }

    try {
      await axios.patch('백엔드_서버_주소/api/profile/password', {
        currentPassword,
        newPassword
      });
      alert('비밀번호 변경 성공!');
      navigate('/profile');
    } catch (error) {
      alert('비밀번호 변경 실패');
      console.error('비밀번호 변경 실패:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="profile-container">
      <h1>비밀번호 변경</h1>
      <form className="profile-card" onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>현재 비밀번호:</label>
          <input
            type="password"
            placeholder="********"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>새 비밀번호:</label>
          <input
            type="password"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <div style={{ fontSize: '0.9em', marginTop: '5px', textAlign: 'left' }}>
            <div>{getSymbol(conditions.type)} 영문/숫자/특수문자 중, 2가지 이상 포함</div>
            <div>{getSymbol(conditions.length)} 8자 이상 32자 이하 입력 (공백 제외)</div>
            <div>{getSymbol(conditions.repeat)} 연속 3자 이상 동일한 문자/숫자 제외</div>
          </div>
        </div>
        <div className="form-group">
          <label>새 비밀번호 확인:</label>
          <input
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="action-button">변경</button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
