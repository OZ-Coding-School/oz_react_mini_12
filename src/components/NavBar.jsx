// src/components/NavBar.jsx
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { logout } from "../hooks/useSupabaseAuth";
import "./NavBar.css";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate({
        pathname: "/search",
        search: createSearchParams({ query: searchTerm }).toString(),
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🎬 OZ무비</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className="search-bar"
      />
      <div className="auth-buttons">
        {user ? (
          <>
            <img
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`}
              alt="avatar"
              className="avatar"
            />
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button className="login" onClick={() => navigate("/login")}>
              로그인
            </button>
            <button className="signup" onClick={() => navigate("/signup")}>
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
