import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query');
    // 확장중입니다. 영화명/배우/장르 분기검색 구현을 위한... 
  const type = useQuery().get('type');      
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ko-KR&include_adult=false`
      );
      setResults(res.data.results.filter(movie => movie.adult === false));
    };

    fetchData();
  }, [query]);

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <h2 className="text-3xl mb-6">🔍 "{query}" 검색 결과</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
            <Link to={`/details/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[400px] object-cover rounded"
            />
            <h3 className="mt-2 text-xl">{movie.title}</h3>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
