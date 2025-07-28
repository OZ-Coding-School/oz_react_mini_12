import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import MovieDetailPage from './pages/MovieDetailPage'; 
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
        <Route path="*" element={<div className="text-center p-8 text-xl">페이지를 찾을 수 없습니다.</div>} />
      </Route>
    </Routes>
  );
}

export default App;
