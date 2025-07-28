import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
         <Link to="/" style={styles.logo}>OZ무비.</Link>
      </div>
      <form style={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </form>
      <div style={styles.navRight}>
        <Link to="/login" style={styles.authButton}>로그인</Link>
        <Link to="/signup" style={styles.authButton}>회원가입</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#c3c3c3', 
    color: '#5d5d5d',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
  },
  navLeft: {
    flex: 1,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  searchForm: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    padding: '15px 20px',
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    fontSize: '18px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    transition: '0.3s ease',
    width: '100%',
    maxWidth: '500px',
    marginTop: '10px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
  },
  authButton: {
    color: '#5d5d5d',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 16px',
    marginLeft: '15px',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
  }
};

export default NavBar;