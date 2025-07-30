// import data from '../assets/data/movieListData.json';
import { MovieCard } from './MovieCard';

function HomePage({movies,loading,setLoading}) {

    
    return (
        <>
        <div className='movie-list'>
        {loading ? (
            <p>검색중입니다...</p>
        ) :
        movies.length === 0 ? (
            <p>검색 결과가 없습니다</p>
        ): movies.map((movie) => (

            <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster={movie.poster_path}
        rating={movie.vote_average}/>
        )
    )}

    </div>
        </>
    )
}

export default HomePage;