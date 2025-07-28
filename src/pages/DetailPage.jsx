import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅 추가
import { fetchMovieDetail } from '../tmdb';// 만든 API 함수 가져오기

const baseUrl = "https://image.tmdb.org/t/p/w500"; // 상세 페이지 이미지용 기본 경로

function DetailPage() {
    // URL에서 영화 ID를 가져옴
  const { id } = useParams();
   // 상세 영화 정보를 저장할 state를 만들어줌
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
        // fetchMovieDetail 함수로 영화 ID를 사용해 상세 정보를 가져옴
      const data = await fetchMovieDetail(id);
      setMovie(data);// 가져온 데이터를 state에 저장.
    }
    getMovie();
  }, [id]); // id가 바뀔 때마다 이 useEffect가 다시 실행돼서 다른 영화 정보를 가져오게 해줌

// 영화 정보가 아직 로딩 중이거나 없을 때 보여줄 화면
  if (!movie) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>영화 정보를 불러오는 중...</div>;
  }

  return (
    <div style={{
      display: 'flex',
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      <img
        src={`${baseUrl}${movie.poster_path || movie.backdrop_path}`}
        alt={movie.title}
        style={{ width: '300px', borderRadius: '8px' }}
      />
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h2>{movie.title}</h2>
        <p><strong>평점:</strong> {movie.vote_average.toFixed(1)}</p>
        <p><strong>장르:</strong> {movie.genres ? movie.genres.map(g => g.name).join(', ') : '정보 없음'}</p>
        <p><strong>줄거리:</strong> {movie.overview || '줄거리 정보가 없습니다.'}</p>
      </div>
    </div>
  );
}

export default DetailPage;