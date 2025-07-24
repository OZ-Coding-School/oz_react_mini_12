import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import App from './pages/App';
import MovieDetail from './pages/MovieDetail';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}
