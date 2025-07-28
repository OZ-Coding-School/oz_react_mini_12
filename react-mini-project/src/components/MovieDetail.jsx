import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  
import axios from "axios";
import './MovieDetail.css';

const MovieDetail = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        console.log("API Key:", apiKey);

        if (!apiKey) {
          throw new Error("Error: API 키가 없습니다.");
        }

        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        setMovie(res.data);
        setLoading(false); 
      } catch (err) {
        console.error("Error", err);
        setLoading(false);
      }
    }
    fetchMovieDetail();
  }, [movieId]);

  if (loading) { 
    return <div className="loading">로딩 중...</div>;  // 로딩 중 표시
  }

  if (!movie) {
    return <div className="error">영화 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="container">
      <div className="leftSection">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
      </div>
      <div className="rightSection">
        <h2>{movie.title}</h2>
        <span className="rating">평점: {movie.vote_average}</span>
        
        <div className="genres">
          <strong>장르: </strong>
          {movie.genres.map((g) => (
            <span key={g.id} className="genre">{g.name}</span>
          ))}
        </div>

        <div className="overview">
          <h4>줄거리:</h4>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
