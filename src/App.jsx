import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="*" element={<div>❌ 페이지를 찾을 수 없습니다</div>} />
      </Route>
    </Routes>
  );
};

export default App;
