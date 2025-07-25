import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <>
    <NavBar />
    <main className="p-5 bg-black">
      <Outlet />
    </main>
  </>
);

export default Layout;
