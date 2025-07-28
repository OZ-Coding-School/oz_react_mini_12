// Link도 react-router-dom의 기능이다. 페이지를 새로고침 없이 이동시키며, 
// <a>대신 쓰이지만 콘솔에는 <a>로 뜨는 비운의 녀석
import {Link } from "react-router-dom"
// TMDB에서 제공하는 영화 이미지가 저장된 기본 URL
const baseUrl = "http://image.tmdb.org/t/p/w500"

// MovieCard라는 함수형 컴포넌트를 정의 했고 매개변수로 ({매개변수들=porps들})을 내려줄 준비 중 
export default function MovieCard({title, poster_path, vote_average}){ 
    return (
        // Link는 a와 거의흡사 이동링크를 만들고, 내용은 클릭이 가능하게 되었고, 
        // to=details는 클릭하면 details페이지로 이동한다는 뜻
        //  className은 js class지정인 것.
        <Link to="/details" className="movie-card">
            {/* 영화 포스터 이미지를 보여주는 태그 src=내용은 
            백틱으로 baseUrl과poster_path를 합쳐서 주소를 만든 것 */}
            <img src={`${baseUrl}${poster_path}`} alt={title} />
            {/* 영화 제목부분이다 */}
            <h3>{title}</h3>
            {/* 말그대로 평점을 보여주는 부분 */}
            <p>평점 : {vote_average}</p>
        </Link>
    )
}
