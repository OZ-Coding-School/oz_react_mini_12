import MovieDetail from './components/MovieDetail';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup'
import MovieListPage from './pages/MovieListPage';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieListPage />} />
        <Route path="details/:id" element={<MovieDetail />} /> 
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}