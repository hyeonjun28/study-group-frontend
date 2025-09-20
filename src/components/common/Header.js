import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <nav>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
          </li>
          <li>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
          </li>
          <li>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>프로필</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;