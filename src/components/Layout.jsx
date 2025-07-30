import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      <NavBar /> 

      <main className="flex-grow p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm shadow-inner">
        <div className="container mx-auto">
          © 2024 영화 도감. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
