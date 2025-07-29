import debounce from "lodash.debounce";
import { memo, useCallback, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PixarLight from "../assets/pixar_light.png";
import PixarDark from "../assets/pixar_dark.png";
import { useThemeStore } from "../store/theme_store";

const Layout = () => {
  // console.log("Layout 컴포넌트 렌더링");
  const { query } = useParams();
  // 인풋밸류는 query를 저장하고 새로고침시 검색UI에 보여주기 위해 쓰임!
  const [inputValue, setInputValue] = useState(
    query?.includes("genre_") ? "" : query || ""
  );

  // const { toggleTheme, isDark } = useThemeStore();
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const navigate = useNavigate();

  // 즉시 검색 함수
  const immediateSearch = useCallback(
    (value) => {
      //  공백만 있다면 검색 x, 값이 있을때만 실행
      if (value.trim()) {
        navigate(`/search/${value.trim()}`);
      }
    },
    [navigate]
  );

  // debounce로 검색 구현
  const debouncedSearch = useCallback(
    debounce((value) => {
      immediateSearch(value);
    }, 500),
    []
  );

  const onChangeSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // 엔터키 누를때 즉시 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      debouncedSearch.cancel();
      immediateSearch(e.target.value);
    }
  };

  // 검색버튼(돋보기) 누를때 즉시검색
  const handleSearchButton = () => {
    immediateSearch(inputValue);
  };

  return (
    <LayoutStyled>
      <nav>
        <div className="top_bar">
          <Link to={"/"} className="home">
            {/* {console.log("Link 렌더링")} */}
            oz_movie
          </Link>
          <img
            className="theme_button"
            src={isDark ? PixarDark : PixarLight}
            onClick={() => toggleTheme()}
          ></img>
          <div className="search">
            <input
              type="text"
              value={inputValue}
              onChange={onChangeSearch}
              onKeyDown={handleKeyDown}
            />
            <span onClick={handleSearchButton}>🔍</span>
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
};
export default Layout;

const LayoutStyled = styled.div`
  nav {
    background-color: ${({ theme }) => theme.background};
    display: flex;
    flex-direction: row;
    height: 6.5rem;
    padding: 1rem 2rem;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.text};
    width: 100%;

    a {
      text-decoration: none;
    }

    .top_bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 1;
      width: 100%;

      .home {
        font-size: 3.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.homeText};
        margin-right: 6rem;
        padding-bottom: 0.5rem;
      }

      .theme_button {
        position: absolute;
        top: 2rem;
        left: 16rem;
        width: 3rem;
        cursor: pointer;
      }
      .search,
      .login {
        display: flex;
        align-items: center;
      }

      a {
        text-decoration: none;
      }

      .search {
        width: 30rem;
        min-width: 10rem;
        transition: all 0.2s ease;
        position: relative;

        input {
          background-color: ${({ theme }) => theme.inputBackground};
          width: 100%;
          height: 3rem;
          border-radius: 1.5rem;
          padding-top: 0.4rem;

          font-size: 1.8rem;
          padding-left: 1.7rem;
          font-weight: 500;
          color: ${({ theme }) => theme.text};
        }
        span {
          cursor: pointer;
          position: absolute;
          right: 1rem;
        }
      }

      .login {
        div {
          width: 4.5rem;
          height: 2.7rem;
          border-radius: 0.4rem;
          background-color: ${({ theme }) => theme.buttonBackground};
          color: ${({ theme }) => theme.buttonText};
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
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
        }
      }
    }
  }
`;
