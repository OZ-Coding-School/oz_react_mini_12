import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "./components/Layout";
import { useMovieStore } from "./store/movies";

const Main = lazy(() => import("./pages/Main.jsx"));
const Detail = lazy(() => import("./pages/Detail.jsx"));


function App() {
  const { fetchInitialMovies, fetchInitialGenres } = useMovieStore();

  useEffect(() => {
    async function init() {
      await fetchInitialMovies();
      await fetchInitialGenres();
    }
    init();
  }, []);
  
  return (
    <>
      <Suspense fallback={<div style={{ fontSize: "6rem" }}>로딩중...</div>}>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/detail/:movieId" element={<Detail></Detail>}></Route>
            {/* <Route path="/search" element={<Search></Search>}></Route> */}
            {/* <Route path="/favorite" element={<Favorite></Favorite>}></Route> */}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
