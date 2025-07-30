import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import MovieDetailPage from './pages/MovieDetailPage';
import './App.scss'; // 이 줄이 있는지 확인하거나 추가해주세요

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
