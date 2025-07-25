import './App.css'
import MovieCard from './components/MovieCard'
import data from  '../data/movieListData.json'
import MovieDetail from './components/MovieDetail'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route 
            index
            element={
              <div className='movieList'>
                {data.results.map((el) => (<MovieCard key={el.id} data={el} />))}
              </div>
            }
          />
          <Route path='/details' element={<MovieDetail />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
