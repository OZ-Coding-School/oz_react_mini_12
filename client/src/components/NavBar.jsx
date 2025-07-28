// client/src/components/NavBar.jsx
import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SUN-0Z 무비</Link>
      </div>
      <div className="auth-buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}

export default NavBar;
