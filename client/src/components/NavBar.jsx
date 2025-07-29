// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import "./NavBar.css";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const NavBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // 1초
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, onSearch, navigate]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`); // ✅ 페이지 이동
    }
  };

  return (
    <nav className="nav-bar">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        SUN-OZ 무비
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="영화 제목 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div className="auth-buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
};

export default NavBar;
