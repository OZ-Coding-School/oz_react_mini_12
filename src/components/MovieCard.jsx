import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/movieApi'; 

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-auto object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/500x750/cccccc/000000?text=No+Poster"; }}
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{movie.title}</h3>
          <p className="text-sm text-gray-600">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
