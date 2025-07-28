import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination, Mousewheel} from 'swiper/modules'
// 로딩 중 보여줄 뼈대 UI컴포넌트
import SkeletonCard from '../components/SkeletonCard';
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [movies, setMovies] = useState([]);
    // 로딩여부상태 초기 값을 true로 둠 
    const [loading, setLoading] = useState(true);
    // 환경변수에서 TMDB API 엑세스 토큰을 갖고옴
    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    // 컴포넌트가 처음 렌더링 시 실행되는 함수
    useEffect(() => {
        async function fetchMovies() {
            try {
                // TMDB 인기 영화 목록 API를 호출
                const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
                    headers: {
                        accept: 'application/json',
                        // 토큰을 헤더에 포함시켜 인증함
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            // 응답 데이터 파싱 
                const data = await res.json();
                // 성인 영화는 제외하는 필터링
                const filtered = data.results.filter(movie => movie.adult === false);
                // 필터링 후 movies에 저장
                setMovies(filtered);
            } catch (error) {
                // API호출 실패 시 에러를 콘솔에 출력
                console.error("영화 목록 가져오기 실패:", error);
            } finally{
                // 결과와 무관하게 로딩 상태는 끝났다고 표시
                setLoading(false);
            }
        }
        // 비동기 함수 호출
        fetchMovies();
        // 빈 배열: 컴포넌트가 마운트될 때 단 한 번만 실행
    }, []);

    // 로딩 중일 때 보여줄 UI
    if (loading) {
        return (
            <div className='movie-grid'>
                {/* 배열 길이 6만큼 SkeletonCard 컴포넌트 6개를 렌더링 */}
                {[...Array(6).map((_, index) => (
                    <SkeletonCard key={index} />
                ))]}
            </div>
        );
    }

    // 데이터 로딩 후 슬라이더 UI를 렌더링
    return (
        <Swiper
        // 사용할 모듈 지정
        modules={[Navigation, Pagination, Mousewheel]}
        // 좌우 화살표 내비게이션
        navigation
        // 페이지네이션 점 클릭 가능(하단에)
        pagination={{clickable: true}}
        // 슬라이드 무한 반복
        loop={true}
        // 마우스 휠로 슬라이드 조작 가능
        mousewheel={{ forceToAxis: false, sensitivity: 3 }}
        // 슬라이드 간 간격(px)
        spaceBetween={20}
        // 화면에 한번에 보이는 슬라이드 개수
        slidesPerView={4}
        // 아래쪽 패딩 추가함
        style={{paddingBottom: '60px'}}
        // 반응형 설정(화면 크기에 슬라이드 개수 조절)
        breakpoints={{
            320: {slidesPerView: 1},
            640: {slidesPerView: 2},
            1024: {slidesPerView: 4}
        }}
    >
            {/* movies 배열을 돌면서 각 영화에 대해 슬라이드 생성 */}
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    {/* 영화 카드 컴포넌트에 영화 정보 전달 */}
                <MovieCard
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average}
                />
            </SwiperSlide>
            ))}
        </Swiper>
    );
}