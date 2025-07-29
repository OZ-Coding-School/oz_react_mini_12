// import React from 'react';
// import detail from '../data/movieDetailData.json';

// const MovieDetail = () => {
//   const { backdrop_path, title, vote_average, genres, overview, poster_path } = detail;

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       try {
//         const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko`, {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
//             accept: 'application/json;charset=utf-8',
//           },
//         });
//         const data = await response.json();
//         console.log("Movie Data:", data);
//         setMovieData(data); // 영화 데이터를 상태로 저장
//         setLoading(false); 
//       } catch(error){
//         console.error('영화 상세 정보 오류', error);
//         setLoading(false); 
//       }
//     }
//     fetchMovieDetail();
//   }, [id]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <img
//         src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
//         alt={title}
//         style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
//       />
//       <h2>{title}</h2>
//       <p>평점: {vote_average}</p>
//       <p>장르: {genres.map((g) => g.name).join(', ')}</p>
//       <p>{overview}</p>
//     </div>
//   );
// };

// export default MovieDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
              Accept: 'application/json',
            },
          }
        );
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error('영화 상세 정보 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!movieData) return <div>영화 정보를 불러올 수 없습니다.</div>;

  const {
    backdrop_path,
    poster_path,
    title,
    vote_average,
    overview,
  } = movieData;
console.log(movieData)
  return (
    <div className="overflow-hidden">
      <img 
  src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`} 
  alt={title} 
  style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', margin: '0 auto' }} 
/>
      <h2 className='title'>{title}</h2>
      <p>평점: {vote_average}</p>
      <p>{overview}</p>
    </div>
  );
};

export default MovieDetail;
