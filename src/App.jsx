import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/Layout";
import { useMovieStore } from "./store/movie_store.js";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./store/theme_store.js";
import { GlobalSyle } from "./GlobalStyle.js";

const Main = lazy(() =>
  import("./pages/Main.jsx").then((module) => ({ default: module.Main }))
);
const Detail = lazy(() => import("./pages/Detail.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));


function App() {
  const { fetchInitialMovies, fetchInitialGenres } = useMovieStore();

  const isDark = useThemeStore((state) => state.isDark); 
  const getTheme = useThemeStore((state) => state.getTheme);
  const theme = getTheme();

  useEffect(() => {
    async function init() {
      try {
        await Promise.all([fetchInitialMovies(), fetchInitialGenres()]);
      } catch (error) {
        console.error("initialize err :", error);
      }
    }
    init();
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalSyle></GlobalSyle>
      <Suspense fallback={<div style={{ fontSize: "6rem" }}>로딩중...</div>}>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/detail/:movieId" element={<Detail></Detail>}></Route>
            <Route path="/search/:query" element={<Search></Search>}></Route>
            {/* <Route path="/favorite" element={<Favorite></Favorite>}></Route> */}
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
