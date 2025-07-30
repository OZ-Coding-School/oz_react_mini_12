import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?query=${searchTerm.trim()}`);
      setSearchTerm('');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Link to="/" className="text-4xl font-extrabold text-red-600 hover:text-red-700 transition-colors duration-300 tracking-tighter">
          영화 도감
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-200 text-base sm:text-lg"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow-md transition duration-200 text-base sm:text-lg font-semibold transform hover:scale-105"
          >
            검색
          </button>
        </form>
      </div>
    </header>
  );
}

export default NavBar;
