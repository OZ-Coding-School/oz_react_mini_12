import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage.jsx"; // 메인용 페이지
import MovieDetail from "./pages/MovieDetail.jsx"; // 상세 페이지

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
