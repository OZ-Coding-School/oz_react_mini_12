import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';
import './App.css'
// import data from './assets/data/movieListData.json';
import Layout from './components/Layout'
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import { fetchPopularMovies } from './tmdb';



function App() {
  // const [movieList, setMovieList] = useState(data.results);

      const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchPopularMovies()
        .then((movies) => {
            setMovies(movies)
            console.log(movies[0]);
        })
        .catch(error => console.error('에러 발생',error));
        
    },[]);

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<HomePage movies={movies}/>}/>
        </Route>
        <Route path={`/detail/:id`} element={<DetailPage movies={movies}/>}/>
        
      </Routes>
    </>
  )
}


export default App
