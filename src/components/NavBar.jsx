import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate({
        pathname: "/search",
        search: createSearchParams({ query: searchTerm }).toString(),
      });
    }
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
        <button className="login">로그인</button>
        <button className="signup">회원가입</button>
      </div>
    </nav>
  );
}
