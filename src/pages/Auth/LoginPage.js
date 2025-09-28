import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert('로그인 성공!');
      navigate('/profile');
    } else {
      alert('이메일과 비밀번호를 입력해주세요.');
    }
  };

  const handleSignUpClick = () => navigate('/signup');

  return (
    <div className="auth-container">
      <h1>로그인</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="auth-form-group">
          <label>이메일</label>
          <input 
            type="email"
            value={email}
            placeholder="example@naver.com" // 흐릿하게 예시 표시
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-form-group">
          <label>비밀번호</label>
          <input 
            type="password"
            value={password}
            placeholder="********" // 흐릿하게 예시 표시
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">로그인</button>
        <button type="button" className="auth-button" style={{ marginTop: '10px' }} onClick={handleSignUpClick}>회원가입</button>
      </form>
    </div>
  );
}

export default LoginPage;