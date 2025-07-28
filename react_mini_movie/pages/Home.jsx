import { useState } from "react";
// 영화 리스트들을 가져왔다.
import movieList from "../data/movieListData.json"
// 영화의 이미지들을 가져왔다
import MovieCard from "../components/MovieCard";


export default function Home() {
    // 얘도 상태변화는 없고 movieList.results(영화 데이터의 배열)을 초기 값지정
    const [movies] = useState(movieList.results)

    return (
        // grid형태로 격자식 나열로 보여지게 스타일링하겠다는 클래스네임지정(적용된건아님)
        // 1 2 3
        // 4 5 6   <이게 그리드
        <div className="movie-grid">
            {/* 현재 Home은 영화 리스트(영화카드들)을 보여주는 컴포넌트인데
            Json데이터 배열을 상태로 갖고 있고, map이란 놈은 movies라는 배열을 돌아서
            movie요소에 대해 하나씩 실행한다는 뜻이고, 결과를 새로운 배열로 만들어 반환해줌 */}
            {movies.map((movie) => (
                // 여기가 그 반환한다는 부분이다.
                <MovieCard
                // map은 키={값}이 필요한데 아래내용들이 map으로 돌릴 정보들이다.
                key={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                />
            ))}
        </div>
    )
}