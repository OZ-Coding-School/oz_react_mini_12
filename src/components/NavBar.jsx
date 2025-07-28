import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; //css 경로 지정

function NavBar() { //상단 바 렌더링
  return (
    <nav className="navbar">
      <h2>Movie App</h2>
      <div>
         {/* Home 클릭 시 "/" 경로, 메인 페이지로 이동*/}
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default NavBar;