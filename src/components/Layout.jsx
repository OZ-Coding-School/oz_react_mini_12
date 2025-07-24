import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"; // 상단 바 컴포넌트 적용

function Layout() { //layout 정의 시작
  return ( //jsx 반환
    <div>
      <NavBar />
      {/*본문 컨텐츠가 서로 붙지 않도록 공간 추가 */}
      <main style={{ padding: "40px" }}> 
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;