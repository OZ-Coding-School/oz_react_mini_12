import React from "react";
import ReactDOM from "react-dom/client";
/* URL 경로, SPA 라우팅을 위한 컴포넌트, URL 관리, Route를 묶는 컨테이너 */
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import App from "./App"; //메인 페이지
import MovieDetail from "./pages/MovieDetail"; //세부 페이지
import Layout from "./components/Layout"; //전체 레이아웃

ReactDOM.createRoot(document.getElementById("root")).render(
    /*라우팅 기능을 활성화*/
    <BrowserRouter>
      {/*경로별 컴포넌트를 매핑*/}
      <Routes> 
        {/*"/" 경로에 Layout 컴포넌트를 렌더링*/}
        <Route path="/" element={<Layout />}>
          {/*"/" 경로에 해당하며, Layout 안에서 App 컴포넌트를 렌더링*/}
          <Route index element={<App />} />
          {/* "/details" 경로로 접속하면 Layout 내부에 MovieDetail 컴포넌트를 렌더링*/}
          <Route path="details" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
);