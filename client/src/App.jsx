// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MovieDetail from "./components/MovieDetail";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

function App() {
  const [query, setQuery] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Layout onSearch={setQuery} />}> {/* 여기 onSearch 전달 */}
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="search" element={<SearchResult />} />
      </Route>
    </Routes>
  );
}

export default App;
