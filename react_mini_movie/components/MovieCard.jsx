import { Link } from "react-router-dom";

// TMDB에서 영화 포스터 이미지를 가져올 때 사용할 URL
const baseUrl = "http://image.tmdb.org/t/p/w500";

// { id, title, poster_path, vote_average }를 props로 받고
export default function MovieCard({ id, title, poster_path, vote_average }) {
    return (

        // id가 (Ex. "123"이라고 한다면) /details/123
        <Link to={`/details/${id}`} className="movie-card">

            {/* 전체 이미지 URL */}
            <img src={`${baseUrl}${poster_path}`} alt={title} />
            <h3>{title}</h3>
            <p>평점 : {vote_average}</p>
        </Link>
    );
}