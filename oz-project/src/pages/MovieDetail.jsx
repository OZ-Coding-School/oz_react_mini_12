import React from 'react';
import movieDetailData from '../../data/movieDetailData.json';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetail() {
  const movie = movieDetailData;
  const { id } = useParams();    // 나중에 실제 데이터 fetching할 때 사용 예정입니다

  return (
    <div
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundImage: `url(${baseUrl}${
          movie.backdrop_path || movie.poster_path
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 배경 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* 메인 컨텐츠 영역 */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* 포스터 */}
        <div className="flex-shrink-0 w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 상세 텍스트 */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-yellow-400 text-lg mb-3">
            ⭐ 평점: {movie.vote_average} ({movie.vote_count}명 참여)
          </p>

          <div className="mb-4">
            {/* 영화 장르 목록, Map으로 돌면서, 각각의 장르를 태그로 렌더링 */}
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="inline-block bg-red-600 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {g.name} {/* 영화 장르 name출력 */}
              </span>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
