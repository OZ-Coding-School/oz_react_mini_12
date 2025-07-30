import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import useDebounce from '../hooks/useDebounce';
import { useSupabaseAuth, logout } from '../hooks/supabaseSetting';

const linkStyle = { color: 'white', textDecoration: 'none', fontSize: '16px' };

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTopButton, setShowTopButton] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useSupabaseAuth();
  const debouncedSearchQuery = useDebounce(searchQuery, 3000);

  // 검색 및 스크롤 관리
  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);

    window.addEventListener('scroll', handleScroll);
    setSearchQuery(''); // 새로고침 시 검색어 초기화

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 디바운스 검색어 변경 시 검색 페이지로 이동
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(debouncedSearchQuery)}`);
    }
  }, [debouncedSearchQuery, navigate]);

  // 프로필 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery, navigate]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
    navigate('/');
  }, [navigate, setUser]);

  return (
    <div className="layout-container">
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <Link to="/" style={{ ...linkStyle, fontSize: '20px', fontWeight: 'bold' }}>
              우미관
            </Link>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>☰</button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" style={linkStyle} className="banner" />

            {!user ? (
              <>
                <Link to="/login" style={linkStyle} className="banner">로그인</Link>
                <Link to="/signup" style={linkStyle} className="banner">회원가입</Link>
              </>
            ) : (
              <div className="profile-container" ref={menuRef}>
                <div className="profile-trigger" onClick={() => setProfileMenuOpen((prev) => !prev)}>
                  <span>👤 {user.email}</span>
                  <span>{profileMenuOpen ? '▲' : '▼'}</span>
                </div>

                {profileMenuOpen && (
                  <div className="profile-menu">
                    <Link to="/mypage" onClick={() => setProfileMenuOpen(false)}>마이페이지</Link>
                    <button onClick={() => { setProfileMenuOpen(false); handleLogout(); }}>로그아웃</button>
                  </div>
                )}
              </div>
            )}
          </nav>

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

      {showTopButton && (
        <button className="top-button" onClick={scrollToTop}>TOP</button>
      )}
    </div>
  );
}
