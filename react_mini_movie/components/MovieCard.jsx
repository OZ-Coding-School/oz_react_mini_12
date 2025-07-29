import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ id, title, poster_path, vote_average, trailerId, onPlayTrailer }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = poster_path ? `${baseUrl}${poster_path}` : '';
  const thumbnailUrl = trailerId ? `https://img.youtube.com/vi/${trailerId}/hqdefault.jpg` : '';

  return (
    <div className="movie-card relative group block overflow-hidden rounded shadow-md hover:shadow-x1 transition">
      <img 
        src={thumbnailUrl  || posterUrl}
        alt={title}
        className="w-full h-auto object-cover"
        onClick={() => onPlayTrailer(trailerId)}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100
                      transition flex flex-col items-center justify-center text-white p-4">
        <h3 className="text-lg font-bold mb-2 text-center">{title}</h3>
        <p className="mb-3">⭐ {vote_average}</p>

        <Link
          to={`/details/${id}`}
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition text-sm mb-2"
          onClick={(e) => e.stopPropagation()}
        >
          상세보기
        </Link>

        {trailerId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayTrailer(trailerId);
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            ▶ 예고편
          </button>
        )}
      </div>
    </div>
  );
}