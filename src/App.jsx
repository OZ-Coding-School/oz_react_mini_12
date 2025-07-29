// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
