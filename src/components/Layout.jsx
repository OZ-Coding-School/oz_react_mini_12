import { memo } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = memo(() => {
  console.log("Layout 컴포넌트 렌더링");
  // debounce로 검색 구현

  const onChangeSearch = (e) => {
    console.log("검색어:", e.target.value);
  };

  return (
    <LayoutStyled>
      <nav>
        <Link to={"/"} className="home">
          {console.log("Link 렌더링")}
          oz_movie
        </Link>
        <div className="top_bar">
          <div className="search">
            <input type="text" onChange={(e) => onChangeSearch(e)} />
            <span>🔍</span>
          </div>
          <div className="login">
            <div>로그인</div>
            <div>회원가입</div>
          </div>
        </div>
      </nav>
      <Outlet />
    </LayoutStyled>
  );
});
export default Layout;


const LayoutStyled = styled.div`
  nav {
    background-color: #353535;
    display: flex;
    flex-direction: row;
    height: 6.5rem;
    padding: 1rem 2rem;
    align-items: center;
    border-bottom: 1px solid white;

    a {
      text-decoration: none;
    }

    .home {
      font-size: 3.5rem;
      font-weight: 700;
      color: white;
      margin-right: 6rem;
      padding-bottom: 0.5rem;
    }

    .top_bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 1;

      .search,
      .login {
        display: flex;
        align-items: center;
      }

      a {
        text-decoration: none;
      }

      .search {
        width: 60%;
        position: relative;
        input {
          background-color: gray;
          width: 100%;
          height: 3rem;
          border-radius: 1.5rem;

          font-size: 1.8rem;
          padding-left: 1.7rem;
          font-weight: 500;
          color: white;
        }
        span {
          position: absolute;
          right: 1rem;
        }
      }

      .login {
        div {
          width: 4.5rem;
          height: 2.7rem;
          border-radius: 0.4rem;
          background-color: #6c01fd;
          color: #fad4fd;
          margin-left: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    nav {
      .top_bar {
        .search {
          display: none;
        }
      }
    }
  }
`;
