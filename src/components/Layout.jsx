import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-inter"> 
      <NavBar /> 

      <main className="flex-grow p-4">
        <Outlet />
      </main>

      <footer className="bg-black text-gray-400 p-4 text-center text-sm shadow-inner">
        <div className="container mx-auto">
          &copy; 2024 NETFLIX CLONE. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
