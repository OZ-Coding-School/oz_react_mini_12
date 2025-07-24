import { Link } from "react-router-dom";

// <nav> 내비영역 표시 습관하기
// <div>로 잡아도 되지만, <nav>가 더 의미론적이고 접근성에 좋음
function NavBar() {
  return (
    <nav style={{ background: "#eee", padding: "10px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>
        Amazing
      </Link>
      <button style={{ background: "pink", marginRight: "10px" }}>
        로그인
      </button>
      <button style={{ background: "pink" }}>회원가입</button>
    </nav>
  );
}

export default NavBar;
