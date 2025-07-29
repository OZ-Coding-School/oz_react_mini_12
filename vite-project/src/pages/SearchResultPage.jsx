import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const fetchSearchMovies =  async () => {
        try{
            const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR`,
            {
                headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
                },
            }
            );
            const data = await response.json();
            //console.log(data)
       const filteredData = data.results.filter((movie) => !movie.adult);
       setMovies (filteredData)
        } catch (err){
            
        }
    }
    fetchSearchMovies()
  }, [query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>"{query}" 검색 결과</h2>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResultPage;
