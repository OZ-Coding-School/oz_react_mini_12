import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ id, title, poster_path, vote_average }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link to={`/details/${id}`} className="movie-link">
      <div className="movie-card">
        <img src={imageUrl} alt={title} className="movie-poster" />
        <div className="movie-info-text">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-rating">⭐ {vote_average.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
}
