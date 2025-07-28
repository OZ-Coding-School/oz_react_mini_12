import { useState } from 'react'
import { Routes, Route} from 'react-router-dom';
import './App.css'
import data from './assets/data/movieListData.json';
import Layout from './components/Layout'
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';

function App() {
  const [movieList, setMovieList] = useState(data.results);

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route path={`/detail/:id`} element={<DetailPage/>}/>
        
      </Routes>
    </>
  )
}


export default App
