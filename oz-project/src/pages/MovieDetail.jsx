import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 영화 기본정보
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        // 영화 출연진 및 감독 정보
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 8));
        const foundDirector = creditsData.crew.find(
          (member) => member.job === 'Director'
        );
        setDirector(foundDirector);

        // 예고편 영상
        const videosRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
        );
        const videosData = await videosRes.json();
        const trailers = videosData.results.filter(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailers(trailers);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    }

    fetchData();
    window.scrollTo(0, 0); // 스크롤은 항상 최상단으로, 페이지 진입시 아래부분로 가는 오류를 없앴습니다.
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">영화 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* 배경 이미지 제공하는게 뒷부분으로 가도록..*/}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${baseUrl}${movie.backdrop_path || movie.poster_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.5)',
        }}
      />

      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 items-center">
        {/* 포스터 */}
        <div className="w-full md:w-1/3 max-w-xs shadow-xl rounded-xl overflow-hidden">
          <img
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full object-cover"
          />
        </div>

        {/* 상세 정보 */}
        <div className="flex-1 text-white space-y-6">
          <h1 className="text-4xl font-extrabold">{movie.title}</h1>

          <p className="text-yellow-400 text-lg">
            ⭐ {movie.vote_average} / 10 ({movie.vote_count.toLocaleString()}명)
          </p>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-red-600/80 px-3 py-1 rounded-full text-sm font-medium"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            {movie.overview || '등록된 시놉시스가 없습니다.'}
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition">
              ▶ 재생
            </button>
            <button className="bg-gray-700/60 px-5 py-2 rounded-lg hover:bg-gray-600 transition">
              + 찜하기
            </button>
          </div>
        </div>
      </div>

      {/* 예고편 트레일러 */}
        {trailers.length > 0 ? (
          <div className="relative z-10 mx-auto px-4 py-10 max-w-6xl"> 
          <h2 className="text-2xl font-bold mb-4 text-white">트레일러 예고편</h2>
            <div className="w-full h-[450px]"> 
            <iframe
              src={`https://www.youtube.com/embed/${trailers[0].key}`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            />
            </div>
          </div>
      ) : (
        <div className="relative z-10 mx-auto px-4 py-10 max-w-6xl">
          <h2 className="text-2xl font-bold mb-4 text-white">예고편</h2>
          <p className="text-white text-lg">해당 영화는 트레일러 영상이 제공되지 않습니다.</p>
        </div>
      )}

      {/* 감독 */}
      {director && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8">
          <h2 className="text-2xl font-bold mb-2 text-white">감독</h2>
          <p className="text-white text-lg">{director.name}</p>
        </div>
      )}

      {/* 출연진 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-4 text-white">출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cast.map((actor) => (
            <div key={actor.cast_id} className="text-center text-white">
              <img
                src={
                  actor.profile_path
                    ? `${baseUrl}${actor.profile_path}`
                    : 'https://via.placeholder.com/150x225?text=No+Image'
                }
                alt={actor.name}
                className="rounded-lg w-full h-[225px] object-cover mb-2"
              />
              <p className="font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
