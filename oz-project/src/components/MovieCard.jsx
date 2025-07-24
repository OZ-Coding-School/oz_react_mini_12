import { Link } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? baseUrl + movie.poster_path
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    /* 클릭 시 상세페이지로 연결
      지금은 목업데이터라 쿵푸팬더만 나옴....
    */
    <Link to={`/details/${movie.id}`} className="block">
      <div className="bg-[#1c1c1e] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer w-full">
        <div className="aspect-[2/3] w-full bg-black">
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-3 text-white">
          <h3 className="text-lg font-semibold truncate">
            {movie.title || movie.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            평점: {movie.vote_average ?? 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}
