import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetail, getImageUrl } from '../api/movieApi';

function MovieDetailPage() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchMovieDetail(id);
          setMovieDetail(data);
        } catch (err) {
          console.error("Failed to fetch movie detail:", err);
          setError("영화 상세 정보를 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };
      getDetail();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center p-8 text-xl font-semibold text-gray-400">영화 상세 정보를 로드 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold text-xl">오류 발생: {error}</div>;
  }

  if (!movieDetail) {
    return <div className="text-center p-8 text-gray-500 text-lg">영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 max-w-5xl mx-auto">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={getImageUrl(movieDetail.poster_path)}
            alt={movieDetail.title}
            className="w-full h-auto rounded-lg shadow-xl object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/500x750/333333/ffffff?text=No+Image';
            }}
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {movieDetail.title}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{movieDetail.tagline}</p>
          
          <div className="flex items-center justify-center md:justify-start mb-6 space-x-4">
            <span className="text-2xl font-bold text-red-600">⭐️ {movieDetail.vote_average ? movieDetail.vote_average.toFixed(1) : 'N/A'}</span>
            <span className="text-lg text-gray-400">({movieDetail.vote_count} 투표)</span>
          </div>

          <p className="text-lg text-gray-300 mb-4">
            **장르:** {movieDetail.genres && movieDetail.genres.map(genre => genre.name).join(', ') || 'N/A'}
          </p>
          <p className="text-lg text-gray-300 mb-4">
            **개봉일:** {movieDetail.release_date || 'N/A'}
          </p>
          <p className="text-lg text-gray-300 mb-6">
            **런타임:** {movieDetail.runtime ? `${movieDetail.runtime}분` : 'N/A'}
          </p>

          <h3 className="text-2xl font-bold text-white mb-3">줄거리</h3>
          <p className="text-gray-300 leading-relaxed mb-8">
            {movieDetail.overview || '줄거리 정보가 없습니다.'}
          </p>
          
          <Link to="/" className="inline-block px-8 py-3 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition duration-300 ease-in-out text-lg font-semibold transform hover:scale-105">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
