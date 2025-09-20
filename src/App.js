import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header'; 
import Footer from './components/common/Footer'; 
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {
  return (
    <Router>
      <Header /> {/* Routes 위에 Header 컴포넌트 추가 */}
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer /> {/* Routes 아래에 Footer 컴포넌트 추가 */}
    </Router>
  );
}

export default App;