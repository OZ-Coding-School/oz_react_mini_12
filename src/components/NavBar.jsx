import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { supabase } from "../supabaseClient";
import LogoutButton from "../components/LogoutButton";
import "../styles/NavBar.css";

function NavBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // 검색어 변경 시 URL 이동
  useEffect(() => {
    if (debouncedQuery) {
      navigate(`/search?query=${encodeURIComponent(debouncedQuery)}`);
    }
  }, [debouncedQuery, navigate]);

  // 로그인 상태 확인
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 'Movie App' 클릭 시 홈으로 이동 + 검색어 초기화
  const handleTitleClick = (e) => {
    e.preventDefault();
    setQuery(""); // 검색창 초기화
    window.location.href = "/";
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

      <div className="navbar-right" ref={menuRef}>
        <button className="profile-button" onClick={() => setMenuOpen(!menuOpen)}>
          👤
        </button>
        {menuOpen && (
          <div className="profile-dropdown">
            {user ? (
              <>
                <div className="profile-email">{user.email}</div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to="/login" className="dropdown-btn" onClick={() => setMenuOpen(false)}>
                  로그인
                </Link>
                <Link to="/signup" className="dropdown-btn" onClick={() => setMenuOpen(false)}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;