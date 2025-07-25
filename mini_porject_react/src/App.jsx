import { useEffect, useState } from 'react';
import MovieCard from './component/MovieCard';
import {Route, Routes } from 'react-router-dom';
import Detalil from './pages/Detail';
import Layout from './component/Layout';

function App() {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    const options = {method: 'GET',
      headers: {accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
      }};

    fetch('https://api.themoviedb.org/3/movie/popular', options)
    .then(res => res.json())
    .then(res => {
      setmovies(res.results.filter(el => !el.adult))
      console.log(res)
    })
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='bg-[black]'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<div className='flex flex-wrap gap-[10px] p-[10px]'>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>} />
          <Route path='detail/:id' element={<Detalil movies={movies}/>} />
          </Route>
      </Routes>
    </div>
  );
};

export default App;