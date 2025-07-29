// src/components/Layout.jsx
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Layout({ onSearch }) {
  return (
    <>
      <NavBar onSearch={onSearch} /> {/* onSearch 전달 */}
      <Outlet />
    </>
  );
}

export default Layout;
