import React from 'react';
import './NavBar.css'; // 스타일 분리 가능

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>🎬 OZ무비</h1>
      <input className="search" placeholder="검색어를 입력하세요" />
      <div className="auth-buttons">
        <button className="login">로그인</button>
        <button className="signup">회원가입</button>
      </div>
    </nav>
  );
};

export default NavBar;
