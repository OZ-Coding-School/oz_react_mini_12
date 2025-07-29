import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/movieApi';

function MovieCard({ movie }) {
  const { id, title, poster_path, release_date } = movie;

  return (
    <Link to={`/movie/${id}`} className="movie-card block relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      <img
        src={getImageUrl(poster_path)}
        alt={title}
        className="w-full h-64 object-cover rounded-t-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/500x750/cccccc/000000?text=No+Image';
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{release_date ? release_date.substring(0, 4) : 'N/A'}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
