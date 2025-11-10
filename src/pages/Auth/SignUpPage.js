import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // ✅ state 추가
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(''); // ✅ 텍스트 입력을 받습니다.
  const [gender, setGender] = useState(''); // ✅ 텍스트 입력을 받습니다.

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // ✅ 성별을 입력했는지 확인
    if (!gender) {
      alert('성별을 입력해주세요.');
      return;
    }

    try {
      // ✅ API로 전송하는 데이터에 추가된 정보 포함
      const response = await api.post('/api/signup', {
        email,
        password,
        name,
        birthDate, // "YYYY-MM-DD" 형식의 텍스트가 전송됩니다.
        gender // "남자" 또는 "여자" 텍스트가 전송됩니다.
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
        
        {/* ✅ 이름 입력 필드 */}
        <div className="auth-form-group">
          <label>이름</label>
          <input type="text" value={name}
            onChange={(e) => setName(e.target.value)} 
            placeholder="홍길동" required />
        </div>

        {/* ✅ 생년월일 입력 필드 (텍스트로 수정) */}
        <div className="auth-form-group">
          <label>생년월일</label>
          <input type="text" value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)} 
            placeholder="YYYY-MM-DD" required />
        </div>

        {/* ✅ 성별 입력 필드 (텍스트) */}
        <div className="auth-form-group">
          <label>성별</label>
          <input type="text" value={gender}
            onChange={(e) => setGender(e.target.value)} 
            placeholder="남자 / 여자" required />
        </div>

        {/* --- 기존 입력 필드 --- */}
        <div className="auth-form-group">
          <label>이메일</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="example@email.com" required />
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
