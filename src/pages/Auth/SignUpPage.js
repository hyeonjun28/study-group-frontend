import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // 새로 만든 CSS 파일 불러오기

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('백엔드_서버_주소/api/auth/signup', {
        email: email,
        password: password
      });

      if (response.status === 201) {
        alert('회원가입이 성공적으로 완료되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('이미 존재하는 이메일입니다.');
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="form-group">
          <label>이메일:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;