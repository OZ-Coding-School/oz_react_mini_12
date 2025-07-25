import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MovieDetail from './pages/MovieDetail';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;