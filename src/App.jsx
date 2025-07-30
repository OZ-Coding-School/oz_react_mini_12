// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchResults from './components/SearchResults';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import MyPage from './components/MyPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
