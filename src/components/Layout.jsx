import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import './SearchResults';
import useDebounce from '../hooks/useDebounce'; // 디바운스 훅 import

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
};

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery, 3000); // 3초 디바운스 적용

  // 3초간 입력 멈추면 자동으로 SearchResults로 이동
  useEffect(() => {
    if (debouncedSearchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(debouncedSearchQuery)}`);
    }
  }, [debouncedSearchQuery, navigate]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 새로고침 시 검색어 초기화
  useEffect(() => {
    setSearchQuery('');
  }, []);

  // 수동 검색 처리 (엔터나 버튼 클릭)
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="layout-container">
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <Link to="/" style={{ ...linkStyle, fontSize: '20px', fontWeight: 'bold' }}>
              우미관
            </Link>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" style={linkStyle} className="banner"></Link>
            <Link to="/login" style={linkStyle} className="banner">로그인</Link>
            <Link to="/contact" style={linkStyle} className="banner">회원가입</Link>
          </nav>

          {/* 검색바 */}
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="영화 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>검색</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      {/* TOP 버튼 */}
      {showTopButton && (
        <button className="top-button" onClick={scrollToTop}>
          TOP
        </button>
      )}
    </div>
  );
}
