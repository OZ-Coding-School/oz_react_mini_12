import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

export default function Layout() {
    return (
        <>
        {/* 모든 페이지 상단에 보여질 메인페이지로 이동하는 바 */}
        <Navbar />
        <main>
            {/* 불러온 하위 컴포넌트 렌더링 (Ex. 영화들) */}
            <Outlet />
        </main>
        </>
    );
}
