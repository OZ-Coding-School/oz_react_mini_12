import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            영화 도감
          </Link>
          <div className="space-x-4">
          </div>
        </nav>
      </header>

      <main className="flex-grow p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        &copy; 2024 영화 도감. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
