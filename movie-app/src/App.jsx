import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import Layout from '../components/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/details" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
