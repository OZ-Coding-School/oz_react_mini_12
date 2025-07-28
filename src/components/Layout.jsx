import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <NavBar />
      <main style={{ paddingTop: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;