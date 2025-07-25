import { useEffect, useState } from 'react';

export default function GenreSelect() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?language=ko-KR',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  return (
    <select className="genre-select" defaultValue="">
      <option value="" disabled>
        장르 선택
      </option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
