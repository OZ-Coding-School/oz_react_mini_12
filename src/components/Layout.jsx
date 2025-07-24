import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

/**
 * 공통 레이아웃을 정의하는 컴포넌트
 * NavBar를 상단에 렌더링하고, 페이지의 실제 내용은 Outlet을 통해 렌더링
 */
function Layout() {
  return (
    <div className="layout-container">
      <NavBar />
      <main className="main-content-container">
        {/* 이 Outlet 부분에 Route에 설정된 자식 컴포넌트(MainPage, DetailPage 등)가 렌더링됨 */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
