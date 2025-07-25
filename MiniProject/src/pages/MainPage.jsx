import React, {useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

function MainPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR', {
                    headers: {
                        accept:'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
                    },
                });
                const data = await response.json();
                const filteredMovies = data.results.filter((movie) => movie.adult === false);
        setMovies(filteredMovies);
            } catch (error) {
                console.error('영화 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <br/>
            <h1>🎬 영화 목록</h1>
            <div style={styles.container}>
                {movies.map((movie) => (
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

