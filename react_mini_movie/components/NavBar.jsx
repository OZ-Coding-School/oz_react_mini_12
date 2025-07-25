import { Link } from "react-router-dom";

// 내비게이션 바, 즉 웹 페이지 상단 메뉴 역할
export default function Navbar() {
    return(
        // 시멘틱태그로 메뉴라는 것을 의미
        <nav>
            {/* 실질적으로 메인페이지로 이동하게 해주는 홈버튼 같은녀석 */}
            <h2><Link to="/">🎬 Movie App</Link></h2>
        </nav>
    );
}