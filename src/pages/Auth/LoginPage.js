import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // 기존 CSS 사용

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('백엔드_서버_주소/api/auth/login', {
        email,
        password
      });

      if (response.status === 200) {
        alert('로그인 성공!');
        navigate('/profile'); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
      console.error('로그인 실패:', error);
    }
  };

  // 회원가입 페이지로 이동
  const handleSignUpClick = () => {
    navigate('/signup'); // SignUpPage 경로
  };

  return (
    <div className="signup-container">
      <h1>로그인</h1>
      <form onSubmit={handleLogin} className="signup-form">
        <div className="form-group">
          <label>이메일:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="signup-button">로그인</button>

        {/* 회원가입 버튼 추가 */}
        <button 
          type="button" 
          className="signup-button" 
          style={{ marginTop: '10px', backgroundColor: '#34d399' }} 
          onClick={handleSignUpClick}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
