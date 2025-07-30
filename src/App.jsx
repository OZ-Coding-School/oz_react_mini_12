import { useState, useEffect, Suspense } from 'react'
import { Routes, Route} from 'react-router-dom';
import './App.css'
// import data from './assets/data/movieListData.json';

import Layout from './components/Layout'
import HomePage from './components/HomePage';
const DetailPage = lazy(() => import('./components/DetailPage'));
import { fetchPopularMovies } from './tmdb';



function App() {

      const [movies, setMovies] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [filteredMovies, setFilteredMovies] =  useState([]);
      const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPopularMovies()
        .then((movies) => {
            setMovies(movies)
            console.log(movies[0]);
        })
        .catch(error => console.error('에러 발생',error));
        
    },[]);

    useEffect(() => {
      setLoading(true);

      const debounceTimer = setTimeout(() => {

        const result = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredMovies(result);
        setLoading(false);
      },700)

      return () => clearTimeout(debounceTimer);

    },[searchTerm, movies])

  return (
    <>
    
      <Routes>
        <Route element={<Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}>
        <Route path='/' element={<HomePage movies={searchTerm.length ?
          filteredMovies : movies} loading={loading} setLoading={setLoading}/>}
      />
        </Route>
        <Suspense fallback={<h2>잠시만 기다려주세요..</h2>}>
        <Route path={`/detail/:id`} element={<DetailPage movies={movies}/>}/>
        </Suspense>
      </Routes>
      
    </>
  )
}


export default App
