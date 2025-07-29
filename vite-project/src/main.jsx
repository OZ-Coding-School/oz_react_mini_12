
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Layout from './layout/Layout';
import './App.css'
import SearchResultPage from './pages/SearchResultPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path='/search/' element={<SearchResultPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
