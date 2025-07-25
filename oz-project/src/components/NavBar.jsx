import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SignupModal from "./SignupModal";

function NavBar() {
    const [search, setSearch] = useState('');
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

  return (
    <nav className="bg-black text-white px-6 py-10 flex items-center">
      {/* 로고 */}
      <div className="flex-shrink-0">
        <Link to="/">
          <h1
            className="text-7xl font-bold cursor-pointer select-none
                        bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500
                        bg-clip-text text-transparent"
          >
            OZFlix
          </h1>
        </Link>
      </div>

      {/* 검색창 */}
      <div className="flex-grow mx-6">
        <div className="relative w-full max-w-4xl mx-auto">
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="영화명을 입력하세요."
            className="w-full pl-12 pr-4 py-2 text-2xl rounded-md bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* 우측 버튼 그룹 */}
      <div className="flex-shrink-0 flex gap-4">
        <button
            onClick={() => setIsSignupOpen(true)}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold cursor-pointer"
        >
            회원가입
        </button>

        <button className="px-6 py-3 text-lg rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer">
          로그인
        </button>
      </div>
            {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
    </nav>
    
  );
}

export default NavBar;
