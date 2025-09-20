import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import DeleteAccountPage from './pages/Profile/DeleteAccountPage';

function App() {
  return (
    <Router>
      <Header /> {/* Routes 위 Header */}
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* 인증 관련 */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
        </Routes>
      </main>
      <Footer /> {/* Routes 아래 Footer */}
    </Router>
  );
}

export default App;
