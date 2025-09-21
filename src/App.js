import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Auth 관련
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';

// Profile 관련
import ProfilePage from './pages/Profile/ProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import DeleteAccountPage from './pages/Profile/DeleteAccountPage';

// Study 관련
import StudyListPage from './pages/Study/StudyListPage';
import StudyWritePage from './pages/Study/StudyWritePage';
import StudyDetailPage from './pages/Study/StudyDetailPage';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* 인증 관련 */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 프로필 관련 */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />

          {/* 스터디 관련 */}
          <Route path="/study" element={<StudyListPage />} />
          <Route path="/study/write" element={<StudyWritePage />} />
          <Route path="/study/:id" element={<StudyDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
