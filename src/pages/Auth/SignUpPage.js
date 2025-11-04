import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await api.post('/api/auth/signup', {
        email,
        password,
      });

      console.log(response.data);
      alert('✅ 회원가입 성공!');
      navigate('/login');

    } catch (error) {
      console.error('회원가입 실패:', error);

      if (error.response?.status === 409) {
        alert('⚠ 이미 존재하는 이메일입니다.');
      } else {
        alert('❌ 서버 오류 발생');
      }
    }
  };

  return (
    <div className="auth-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp} className="auth-form">
        <div className="auth-form-group">
          <label>이메일</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="auth-form-group">
          <label>비밀번호</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="auth-form-group">
          <label>비밀번호 확인</label>
          <input type="password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button className="auth-button" type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;
