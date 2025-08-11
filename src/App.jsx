import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/Layout";
import { useMovieStore } from "./store/movie_store.js";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./store/theme_store.js";
import { GlobalSyle } from "./GlobalStyle.js";
import Skeleton from "./components/skeletonUI.jsx";
import LoginModal from "./components/LogInModal.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import MyPageModal from "./components/MyPageModal.jsx";
import MyPage from "./pages/MyPage.jsx";
import { useLoginStore } from "./store/logIn_store.js";
import { supabase } from "./util/supabaseClient.js";
// import SignUp from "./pages/SignUp.jsx";

const Main = lazy(() =>
  import("./pages/Main.jsx").then((module) => ({ default: module.Main }))
);
const Detail = lazy(() => import("./pages/Detail.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));

function App() {
  const { fetchInitialMovies, fetchInitialGenres } = useMovieStore();

  const location = useLocation();
  const state = location.state && location.state.backgroundLocation;

  // isDark 상태 변수가 쓰이지는 않았으나 리랜더링을 위해 구독함
  const isDark = useThemeStore((state) => state.isDark);
  const getTheme = useThemeStore((state) => state.getTheme);
  const theme = getTheme();

  const { login } = useLoginStore();
  useEffect(() => {
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        login(data.session.user); 
      }
      if (error) throw error;
    };
    restoreSession();
  }, []);

  // 초기화 로직 : Promise.allSettled를 통해 오류가 났을때를 대비함
  useEffect(() => {
    async function init() {
      try {
        const results = await Promise.allSettled([
          fetchInitialMovies(),
          fetchInitialGenres(),
        ]);

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            // console.log(
            //   `Promise ${index + 1} succeeded with value:`,
            //   result
            // );
            // 성공한 경우 결과 처리는 모두 스토어에 로직이 있음
            // 해당 코드는 오류만 처리
          } else if (result.status === "rejected") {
            // 실패한 경우 에러 처리
            console.error(
              `Promise ${index + 1} failed with reason:`,
              result.reason
            );
            // 각각의 에러 로그 뽑기
            if (index === 0) {
              console.error("Failed to fetch MOIVES:", result.reason);
            } else if (index === 1) {
              console.error("Failed to fetch GENRES:", result.reason);
            }
          }
        });
      } catch (error) {
        console.error("Unexpected error in init:", error);
      }
    }
    init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalSyle></GlobalSyle>
      <Suspense fallback={<Skeleton />}>
        <Routes location={state || location}>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/detail/:movieId" element={<Detail />}></Route>
            <Route path="/search/:query" element={<Search />}></Route>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
        {state && (
          <Routes>
            <Route path="/login" element={<LoginModal />} />
            <Route path="/signup" element={<LoginModal />} />
            <Route path="/myPageModal" element={<MyPageModal />} />
          </Routes>
        )}
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
