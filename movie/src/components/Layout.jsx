import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import GenreSelect from './GenreSelect';
import './Layout.css';

export default function Layout() {
  return (
    <>
      <NavBar />

      <div className="filters">
        <div className="category-labels">
          <span>인기 영화</span>
          <span>현재 상영작</span>
          <span>최고 평점</span>
        </div>
        <GenreSelect />
      </div>

      <Outlet />
    </>
  );
}
