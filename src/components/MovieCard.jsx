import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/movieApi';

function MovieCard({ movie }) {
  const { id, title, poster_path, release_date } = movie;

  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
        <img
          src={getImageUrl(poster_path)}
          alt={title}
          className="w-full h-64 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/500x750/333333/ffffff?text=No+Image';
          }}
        />
        <div className="p-3">
          <h3 className="text-base font-semibold text-white truncate mb-1">{title}</h3>
          <p className="text-xs text-gray-400">{release_date ? release_date.substring(0, 4) : 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
