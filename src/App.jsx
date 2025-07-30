// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import Search from './pages/Search';
import Signup from './pages/Signup'; // ✅ 추가
import Login from './pages/Login';   // ✅ 추가

import { UserProvider, useUser } from './contexts/UserContext';

function AppContent() {
  const { getUserInfo } = useUser();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="details/:id" element={<DetailPage />} />
        <Route path="search" element={<Search />} />
        <Route path="signup" element={<Signup />} /> {/* ✅ 회원가입 */}
        <Route path="login" element={<Login />} />   {/* ✅ 로그인 */}
        <Route path="*" element={<div>❌ 페이지를 찾을 수 없습니다</div>} />
      </Route>
    </Routes>
  );
}

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
