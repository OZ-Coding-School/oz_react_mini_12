// react-router-dom은 라이브러리로 react에서 페이지 이동(라우팅)을 가능케 한다.
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

// 다른 파일에서 Layout컴포넌트를 import하여 부를 수 있도록 하고, 정의 한다.
export default function Layout() {
    // Layout라는 이름의 함수가 어떤 결과 값을 낼지 결정한다.
    return (
        <>
        {/* Navbar컴포넌트를 결과로 제시한다 */}
        <Navbar />
        {/* main은 HTML5 시멘틱 태그로 본문을 의미한다 실질적인 의미는 Outlet컴포넌트이다 */}
        <main>
            {/* Outlet은 react-router-dom의 기능으로 라우팅되어 현재 페이지에 온 것.
             main태그===책의표지 Outlet은 책의실제 내용(값)이다 */}
            <Outlet />
        </main>
        </>
    );
}
