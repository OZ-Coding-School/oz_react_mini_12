import React, {useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function MainPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const url = query
                ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ko-KR`
                : `https://api.themoviedb.org/3/movie/popular?language=ko-KR`;

            try {
                const response = await fetch(url, {
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
    }, [query]);

    return (
        <div>
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
    page: {
        paddingTop: '80px',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
    },
};

export default MainPage;

