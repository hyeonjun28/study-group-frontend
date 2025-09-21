import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const conditions = checkPasswordConditions(password);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!conditions.length || !conditions.type || !conditions.repeat) {
      alert('비밀번호 조건을 확인하세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('백엔드_서버_주소/api/auth/signup', { email, password });
      if (response.status === 201) {
        alert('회원가입 성공!');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('이미 존재하는 이메일입니다.');
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
      console.error('회원가입 실패:', error.response ? error.response.data : error);
    }
  };

  const getSymbol = (condition) => {
    if (password === '') return '✔️';
    return condition ? '✅' : '❌';
  };

  return (
    <div className="auth-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp} className="auth-form">
        <div className="auth-form-group">
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            placeholder="example@naver.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="auth-password-hint">
            <div>{getSymbol(conditions.type)} 영문/숫자/특수문자 중, 2가지 이상 포함</div>
            <div>{getSymbol(conditions.length)} 8자 이상 32자 이하 입력 (공백 제외)</div>
            <div>{getSymbol(conditions.repeat)} 연속 3자 이상 동일한 문자/숫자 제외</div>
          </div>
        </div>

        <div className="auth-form-group">
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="********"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;
