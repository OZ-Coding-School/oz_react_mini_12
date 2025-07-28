// useState는 react의 상태 관리 훅이다. 얘는 상태 변화 할때도 쓴다.
import { useState } from "react"
// 영화상세 데이터를 담은 JSON형태의 파일을 갖고 왔다.
import movieDetailData from "../data/movieDetailData.json";
// 영화 이미지가 담긴 URL
const baseUrl = "https://image.tmdb.org/t/p/w500"
// MovieDetail 컴포넌트.
export default function MovieDetail() {
    // useState로 movie를 상태 선언함. movieDetailData를 초기 값으로 지정해서
    // 고정된 영화 데이터를 상태로 관리한다. setState를 쓰지 않은 것은 관리만 필요해서이다.
    const [movie] = useState(movieDetailData);

    return(
        // 영화 상세 정보를 담은 컨테이너
        <div className="movie-detail-container">
            {/* 포스터 내부에 영화배경이미지를 띄운다 
            이미지(backdrop_path) 또는 포스터(poster_path) */}
            <div className="poster">
                {/* ||는 그냥 안전장치 앞의 주소의 이미지가 없으면 뒤에것을 띄우기 위함이다 */}
            <img src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`} 
            alt={movie.title} />
            </div>
            {/* 영화의 info를 담은 div ( 영화의 제목 평점 장르 줄거리 등 ) */}
            <div className="info">
                <div className="title-rating">
                <h1 className="title">{movie.title}</h1>
                <p className="rating">평점 : {movie.vote_average}</p>
            </div>
                <div className="genre">
                    {/* map으로 각 장르 객체에서 name만 뽑아낸 후,join(", ")으로
                     콤마(,)와 공백을 넣어 문자열로 만들어 보여줌 */}
                    장르 : {movie.genres.map((genre) => genre.name).join(", ")}
                </div>
                <p className="overview">{movie.overview}</p>
            </div>
        </div>
    );
}