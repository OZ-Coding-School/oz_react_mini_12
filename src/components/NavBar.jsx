import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px', background: '#222', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        OZ무비
      </Link>
    </nav>
  );
};

export default NavBar;
