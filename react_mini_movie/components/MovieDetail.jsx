// 영화 상세 정보를 API로 가져와서 화면에 렌더링하는 곳

// react-router-dom에서 useParams 훅을 가져옴
import { useParams } from "react-router-dom";

// useEffect: 컴포넌트가 렌더링될 때 API 요청 수행
// useState: 받아온 영화 데이터를 저장하기 위한 상태
import { useEffect, useState } from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {

    // URL의 동적 경로값(id)등을 추출해주는 React Router의 hook
    // URL의 /details/:id에서 id 값을 가져옴 (detail.id)
    const { id } = useParams();
    // 영화 상태를 저장할 상태 초기값은 null
    const [movie, setMovie] = useState(null);
    // 에러 상태 추가
    const [error, setError] = useState(null);
    // TMDB API 호출에 필요한 액세스 토큰(환경 변수에서 불러온다. Ex. .env파일)
    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    // 컴포넌트가 화면에 렌더링되거나, 어떤 값이 바뀔 때 “효과(부수 작업)”를 실행할 수 있게 해주는 React Hook
    // 컴포넌트가 처음 마운트되거나 id가 바뀔 때마다 API 요청
    useEffect(() => {
        async function fetchMovieDetail() {
            try {
                // TMDB API를 통해서 HTTP 요청 전송 - 특정한 영화의 상세 정보를 가져오는 곳
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
                    headers: {
                        accept: 'application/json',
                        // 인증 방식 : Bearer토큰 (Ex. 보안용도 이런 과정을 겪지 않으면 누구나 마음 껏 사용할 수 있다.)
                        Authorization: `Bearer ${accessToken}`,
                    }
                });

                if(!res.ok) {
                    throw new Error("서버 응답 실패")
                }

                // await는 promise가 완료 될때까지 기다림 실패시 트라이/캐치로 잡아줘야 함
                // JSON 형태로 변환한 데이터 저장
                // 서버 응답을 JSON 형태로 파싱할 때까지 기다림
                const data = await res.json();
                // 서버 응답을 JSON 형태로 파싱할 때까지 기다림
                // 상태 업데이트 후 컴포넌트가 재렌더링되어 화면에 변경사항 반영
                setMovie(data);
            } catch (error) {
                console.error("상세 정보 불러오기 실패:", error);
                setError("영화 정보를 불러오지 못했습니다.")
            }
        }
        
        // 함수 실행 id가 바뀌면 다시 실행
        fetchMovieDetail();
    }, [id]);
    // 에러가 있을 경우 사용자에게 표시한다
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    // 아직 데이터를 가져오지 못했으면 로딩 표시
    if (!movie) return <p>로딩 중...</p>;

    // 데이터를 성공적으로 가져온 경우 렌더링
    return (
        <div className="movie-detail-container">
            <div className="poster">
                {/* 포스터 이미지 movie.backdrop_path의 주소 혹은 movie.poster_path의 주소 */}
                <img src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="info">
                <div className="title-rating">
                    <h1 className="title">{movie.title}</h1>
                    <p className="rating">평점 : {movie.vote_average}</p>
                </div>
                <div className="genre">
                    {/* Optional chaining ?.값이 null이나 undefined인 경우 에러 없이 접근할 때 사용 
                        moive.genres가 유효한 값이면 map을 실행, 아니라면 undefined(렌더링 생략)
                        */}
                    {movie.genres?.map((genre) => (
                        <span key={genre.id}>{genre.name} </span>
                    ))}
                </div>
                <p className="overview">{movie.overview}</p>
            </div>
        </div>
    );
}