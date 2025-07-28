import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetail, getImageUrl } from '../api/movieApi'; // TMDB API 호출 함수 임포트

function MovieDetailPage() {
  const { id } = useParams(); // URL에서 영화 ID (예: /movie/12345) 가져오기
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        // 영화 ID를 사용하여 TMDB API에서 상세 정보 가져오기
        const data = await fetchMovieDetail(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('영화 상세 정보를 가져오지 못했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]); // URL의 영화 ID가 변경될 때마다 다시 데이터를 가져옴

  if (loading) {
    return <div className="text-center p-8 text-lg font-semibold">영화 상세 정보를 로드 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center p-8 text-lg">영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Link to="/" className="self-start mb-4 text-blue-600 hover:underline">
        &larr; 뒤로 가기
      </Link>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">{movie.title}</h2>
        <p className="text-xl text-gray-600 mb-6">{movie.tagline}</p>
        <div className="flex justify-center mb-6">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-64 h-auto object-cover rounded-lg shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/256x384/cccccc/000000?text=No+Poster"; }}
          />
        </div>
        <div className="text-left mt-4">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">줄거리</h3>
          <p className="text-gray-700 leading-relaxed">{movie.overview || '줄거리 정보가 없습니다.'}</p>
          <p className="mt-4 text-gray-600">개봉일: {movie.release_date}</p>
          <p className="text-gray-600">평점: {movie.vote_average?.toFixed(1)} / 10</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
