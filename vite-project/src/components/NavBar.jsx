import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce.js';

const NavBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();


  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      navigate(`/search?query=${debouncedQuery}`);
    }
  }, [debouncedQuery, navigate]);

  const handleLogoClick = () => {
    setQuery('');
    navigate('/');
  };

  return (
    <nav style={navStyles.nav}>
      {/* 클릭 시 홈으로 이동 */}
      <span style={navStyles.logo} onClick={handleLogoClick}>
        OZ무비
      </span>

      <input
        type="text"
        placeholder="영화 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={navStyles.input}
      />
    </nav>
  );
};
const navStyles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1000px',
    padding: '10px 26px',
    backgroundColor: '#331919ff',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: '#e50914',
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  input: {
    padding: '6px 10px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    width: '180px',
    backgroundColor: '#333',
    color: '#fff',
  },
};

export default NavBar;
