import { useState } from "react"
import movieDetailData from "../data/movieDetailData.json";
const baseUrl = "https://image.tmdb.org/t/p/w500"
export default function MovieDetail() {
    const [movie] = useState(movieDetailData);

    return(
        <div className="movie-detail-container">
            <div className="poster">
            <img src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`} 
            alt={movie.title} />
            </div>
            <div className="info">
                <div className="title-rating">
                <h1 className="title">{movie.title}</h1>
                <p className="rating">평점 : {movie.vote_average}</p>
            </div>
                <div className="genre">
                    장르 : {movie.genres.map((genre) => genre.name).join(", ")}
                </div>
                <p className="overview">{movie.overview}</p>
            </div>
        </div>
    );
}