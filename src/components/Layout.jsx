// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex',
     flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <nav
        style={{
          backgroundColor: '#333',
          height: '60px',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          minWidth: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            maxWidth: '960px', // 중앙 정렬 및 최대 너비 제한
          }}
        >
          <Link to="/" style={linkStyle}>홈</Link>
          <Link to="/about" style={linkStyle}>소개</Link>
          <Link to="/services" style={linkStyle}>서비스</Link>
          <Link to="/contact" style={linkStyle}>연락처</Link>
          <Link to="/login" style={linkStyle}>로그인</Link>
        </div>
      </nav>

      <main
        style={{
          flex: 1,
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
};