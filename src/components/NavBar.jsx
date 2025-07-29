import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import "../styles/NavBar.css";

function NavBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const location = useLocation();

  // 검색어 변경 시 URL 이동
  useEffect(() => {
    if (debouncedQuery) {
      navigate(`/search?query=${encodeURIComponent(debouncedQuery)}`);
    }
  }, [debouncedQuery, navigate]);

  // 'Movie App' 클릭 시 홈으로 이동 + 검색어 초기화
  const handleTitleClick = (e) => {
    e.preventDefault();
    setQuery(""); // 검색창 초기화
    window.location.href = "/"; //새로고침 포함 이동
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" onClick={handleTitleClick} className="navbar-title">
          Movie App
        </a>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="navbar-right">
        {/* 로그인/유저 메뉴 자리 */}
      </div>
    </nav>
  );
}

export default NavBar;