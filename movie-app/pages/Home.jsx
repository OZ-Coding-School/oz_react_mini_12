import { useState } from 'react'
import data from "../data/movieListData.json"
import MovieCard from '../components/MovieCard'
import BannerSlider from '../components/BannerSlider'

function Home() {
    const [movieList, setMovieList] = useState(data.results)

    return (
        <div className="min-h-screen bg-darkest text-white px-4 py-6 space-y-12">
            {/* 상단 배너 슬라이더 */}
            <BannerSlider />

            <div className="grid grid-cols-5 gap-6 p-4 max-w-[1024px] mx-auto">
                {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home
