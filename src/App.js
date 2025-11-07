import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// 공통 레이아웃
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

// Schedule 관련
import SchedulePage from './pages/Schedule/SchedulePage';

// ✅ ✅ Auth 전용 레이아웃 (Header/Footer 없음)
function AuthLayout({ children }) {
  return <div>{children}</div>;
}

// ✅ ✅ 메인 레이아웃 (Header/Footer 포함)
function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ 기본 경로 → 로그인으로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ 로그인/회원가입: Header/Footer 없는 레이아웃 */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          }
        />

        {/* ✅ 메인 페이지: Header/Footer 있는 레이아웃 */}
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/change-password"
          element={
            <MainLayout>
              <ChangePasswordPage />
            </MainLayout>
          }
        />
        <Route
          path="/delete-account"
          element={
            <MainLayout>
              <DeleteAccountPage />
            </MainLayout>
          }
        />

        <Route
          path="/study"
          element={
            <MainLayout>
              <StudyListPage />
            </MainLayout>
          }
        />
        <Route
          path="/study/write"
          element={
            <MainLayout>
              <StudyWritePage />
            </MainLayout>
          }
        />
        <Route
          path="/study/:id"
          element={
            <MainLayout>
              <StudyDetailPage />
            </MainLayout>
          }
        />

        <Route
          path="/schedule"
          element={
            <MainLayout>
              <SchedulePage />
            </MainLayout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
