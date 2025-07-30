import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MovieDetail from "./components/MovieDetail";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import useSupabaseAuth from "./supabase/useSupabaseAuth";

function App() {
  const { getUserInfo } = useSupabaseAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout onSearch={() => {}} />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="search" element={<SearchResult />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
