import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import Layout from './components/pages/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<App />} />
        <Route path='movie/:id' element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
