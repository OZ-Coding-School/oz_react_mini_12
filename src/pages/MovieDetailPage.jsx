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
    return <div className="text-center p-8 text-lg font-semibold">영화 상세 정보를 로드 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold">오류 발생: {error}</div>;
  }

  if (!movieDetail) {
    return <div className="text-center p-8 text-gray-600">영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="movie-detail-container">
        <div className="poster">
          <img
            src={getImageUrl(movieDetail.poster_path)}
            alt={movieDetail.title}
            className="w-full h-auto rounded-lg shadow-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/500x750/cccccc/000000?text=No+Image';
            }}
          />
        </div>
        <div className="info">
          <div className="title-rating">
            <h1 className="title">{movieDetail.title}</h1>
            <span className="rating">⭐️ {movieDetail.vote_average ? movieDetail.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <p className="genre">
            {movieDetail.genres && movieDetail.genres.map(genre => genre.name).join(', ')}
          </p>
          <p className="overview">{movieDetail.overview || '줄거리 정보가 없습니다.'}</p>
          <p className="text-gray-700">개봉일: {movieDetail.release_date || 'N/A'}</p>
          <p className="text-gray-700">런타임: {movieDetail.runtime ? `${movieDetail.runtime}분` : 'N/A'}</p>
          
          <Link to="/" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-center">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
