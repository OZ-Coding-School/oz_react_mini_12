import React from "react";
import ReactDOM from "react-dom/client";
/* URL 경로, SPA 라우팅을 위한 컴포넌트, URL 관리, Route를 묶는 컨테이너 */
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import App from "./App"; //메인 페이지
import MovieDetail from "./pages/MovieDetail"; //세부 페이지
import Layout from "./components/Layout"; //전체 레이아웃
import SearchPage from "./pages/SearchPage"; //검색 결과 페이지
import SignupPage from "./pages/SignupPage"; //회원가입 페이지
import LoginPage from "./pages/LoginPage"; //로그인 페이지
import AuthStatus from "./components/AuthStatus"; //알림 및 전체 설정 컴포넌트
import MyPage from "./pages/MyPage"; //마이 페이지

ReactDOM.createRoot(document.getElementById("root")).render(
  /*라우팅 기능을 활성화*/
  <BrowserRouter>
    {/*경로별 컴포넌트를 매핑*/}
    <Routes> 
      {/*"/" 경로에 Layout 컴포넌트를 렌더링*/}
      <Route path="/" element={<Layout />}>
        {/*"/" 경로에 해당하며, Layout 안에서 App 컴포넌트를 렌더링*/}
        <Route index element={<App />} />
        <Route path="search" element={<SearchPage />} />
        {/* "/details/:id" 경로로 접속하면 Layout 내부에 MovieDetail 컴포넌트를 렌더링 */}
        <Route path="details/:id" element={<MovieDetail />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);