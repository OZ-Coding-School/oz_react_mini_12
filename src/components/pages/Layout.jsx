import { Outlet } from 'react-router';
import NavBar from './NavBar';

function Layout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
