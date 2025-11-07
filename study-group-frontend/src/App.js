import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 레이아웃
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";

// Private pages
import ProfilePage from "./pages/Profile/ProfilePage";
import DeleteAccountPage from "./pages/Profile/DeleteAccountPage";
import StudyListPage from "./pages/Study/StudyListPage";
import StudyWritePage from "./pages/Study/StudyWritePage";
import StudyDetailPage from "./pages/Study/StudyDetailPage";
import SchedulePage from "./pages/Schedule/SchedulePage";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ 로그인 전 */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* ✅ 로그인 후 */}
        <Route
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/app/profile" element={<ProfilePage />} />
          <Route path="/app/delete-account" element={<DeleteAccountPage />} />

          <Route path="/app/study" element={<StudyListPage />} />
          <Route path="/app/study/write" element={<StudyWritePage />} />
          <Route path="/app/study/:id" element={<StudyDetailPage />} />

          <Route path="/app/schedule" element={<SchedulePage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
