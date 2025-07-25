import { Link } from 'react-router-dom';
import './NavBar.css';
import GenreSelect from './GenreSelect';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="oz">OZ</span>
        <span className="movie">무비</span>
      </Link>

      <input className="search" type="text" placeholder="영화를 검색하세요" />

      <div className="auth-buttons">
        <button className="btn login">로그인</button>
        <button className="btn signup">회원가입</button>
      </div>
    </nav>
  );
}
