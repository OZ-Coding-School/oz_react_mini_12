// src/components/NavBar.jsx
import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import useSupabaseAuth from "../supabase/useSupabaseAuth";

// 기본 사용자 아이콘 (svg)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="white"
    viewBox="0 0 24 24"
    style={{ marginRight: 8 }}
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const NavBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { logout: supaLogout } = useSupabaseAuth();

  // 드롭다운 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 검색 debounce 처리
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, onSearch, navigate]);

  // 드롭다운 외부 클릭 시 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = async () => {
    await supaLogout();
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div className="auth-buttons" style={{ position: "relative" }}>
        {user ? (
          <>
            <button
              onClick={toggleDropdown}
              style={{
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              <UserIcon />
              <span>{user.userName ? `${user.userName}님` : "유저님"}</span>
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  top: "calc(100% + 5px)",
                  right: 0,
                  backgroundColor: "#333",
                  borderRadius: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  width: 140,
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    // 마이페이지 경로는 5단계에서 추가 예정
                    alert("마이페이지는 5단계에서 구현됩니다.");
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 12px",
                    background: "none",
                    border: "none",
                    color: "white",
                    textAlign: "left",
                    cursor: "pointer",
                    borderBottom: "1px solid #555",
                  }}
                >
                  마이페이지
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 12px",
                    background: "none",
                    border: "none",
                    color: "white",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  로그아웃
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
