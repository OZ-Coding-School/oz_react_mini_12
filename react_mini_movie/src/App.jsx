import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from '../components/Layout';
import MovieDetail from '../components/MovieDetail';
import Home from '../pages/Home';

export default function App() {
return (
  <Routes>
    <Route element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='details' element={<MovieDetail />} />
    </Route>
  </Routes>
  );
}
