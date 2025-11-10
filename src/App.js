import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';

import ProfilePage from './pages/Profile/ProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import DeleteAccountPage from './pages/Profile/DeleteAccountPage';

import StudyListPage from './pages/Study/StudyListPage';
import StudyWritePage from './pages/Study/StudyWritePage';
import StudyDetailPage from './pages/Study/StudyDetailPage';
import StudyEditPage from './pages/Study/StudyEditPage'; // ✅ 추가됨

import SchedulePage from './pages/Schedule/SchedulePage';

function AuthLayout({ children }) {
  return <div>{children}</div>;
}

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

        <Route path="/" element={<Navigate to="/login" />} />

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
          path="/study/edit/:id"
          element={
            <MainLayout>
              <StudyEditPage />
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
