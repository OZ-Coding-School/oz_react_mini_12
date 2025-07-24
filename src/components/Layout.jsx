import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <NavBar /> {/* NavBar 표시 */}
      <Outlet /> {/* 페이지 내용 들어갈 자리 */}
    </div>
  );
}

export default Layout;
