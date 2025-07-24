import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

/**
 * 모든 페이지 상단에 표시될 네비게이션 바 컴포넌트
 * 로고, 검색창, 로그인/회원가입 버튼을 포함
 */
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <span>OZ</span>
          <span className="logo-text">무비</span>
          <span className="logo-dot">.</span>
        </Link>
      </div>
      <div className="navbar-center">
        <input type="text" className="search-bar" placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요." />
      </div>
      <div className="navbar-right">
        <button className="auth-button login">로그인</button>
        <button className="auth-button signup">회원가입</button>
      </div>
    </nav>
  );
}

export default NavBar;

