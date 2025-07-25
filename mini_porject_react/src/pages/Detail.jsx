import { useParams } from "react-router-dom";
import movieDetailData from '../data/movieDetailData.json';
// import { useState } from "react";


export default function Detalil({movies}) {
    const {id} = useParams()
    const detailMovie = movieDetailData;
    const movie = movies.find(el => el.id === Number(id))

    const genreList = detailMovie.genres.filter(el => movie.genre_ids.includes(el.id))

    return(
        <>
            <div className="flex gap-[10px] p-[20px] text-[white] h-screen">
                <img src ={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title}`}
                className="w-[300px] h-[450px]" />
                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between items-center">
                        <div className="text-[32px]">{movie.title}</div>
                        <div>평점: {movie.vote_average}⭐</div>
                    </div>
                    <div className="flex flex-row justify-around">
                        {genreList.map(
                            genre => (<span key={genre.id} className="p-[10px] w-auto border rounded">
                                {genre.name}
                            </span>))}
                    </div>
                    <div>{movie.overview}</div>
                </div>
            </div>
        </>
    )
}