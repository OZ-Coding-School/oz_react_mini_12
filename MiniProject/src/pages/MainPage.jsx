import React from 'react';
import movieList from '../assets/data/movieListData.json';
import MovieCard from '../components/MovieCard';

function MainPage() {
    return (
        <div>
            <br/>
            <h1>🎬 영화 목록</h1>
            <div style={styles.container}>
                {movieList.results.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                    />
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
    },
};

export default MainPage;

