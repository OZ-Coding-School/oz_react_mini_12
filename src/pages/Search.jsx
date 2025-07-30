import { useState, useEffect } from "react";
import { MovieCardSkeleton, MovieGrid } from "./Main";
import { MovieCard } from "../components/MovieCard";
import { useParams } from "react-router-dom";
import {
  fetchGenres,
  searchMoviesbyGenre,
  searchMoviesByTitle,
} from "../api/tmbi";
import styled from "styled-components";
import { useMovieStore } from "../store/movie_store";

export default function Search() {
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useParams(); // useParams()에서 쿼리 추출 (URL: /search/:query)
  const { genreMap } = useMovieStore();
  const [isGenreSearch, setIsGenreSearch] = useState(false);

  // console.log("query:", query);
  // 검색, error 내용 사용자에게 보여주기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const result = query.includes("genre_")
          ? await searchMoviesbyGenre(query.replace("genre_", ""))
          : await searchMoviesByTitle(query);

        setIsGenreSearch(query.includes("genre_") ? true : false);
        // console.log(
        //   query.includes("genre_") ? "genre search:" : "title search:",
        //   query
        // );
        if (result.error) {
          setError(result.error);
          setSearchList([]);
        } else if (result.message) {
          setError(result.message);
          setSearchList([]);
        } else {
          setSearchList(result);
        }
      } catch (err) {
        setError("영화 검색 중 오류가 발생했습니다.");
        setSearchList([]);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]); // query가 변경될 때마다 검색 실행

  return (
    <>
      {isGenreSearch ? (
        <SearchGenreName>
          장르 검색 : {genreMap[Number(query.replace("genre_", ""))]}
        </SearchGenreName>
      ) : null}
      <MovieGrid>
        {isLoading ? (
          // 로딩 중일 때 스켈레톤 UI 표시
          Array.from({ length: 5 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        ) : error ? (
          // 에러 발생 시 메시지 표시
          <Emergency>{error}</Emergency>
        ) : searchList.length === 0 ? (
          // 검색 결과가 없을 때
          <Emergency>검색 결과가 없습니다.</Emergency>
        ) : (
          // 검색 결과 표시
          searchList.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </MovieGrid>
    </>
  );
}

const Emergency = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  margin-top: 3rem;
  margin-left: 50%;
  font-size: 3rem;
  text-align: center;
  display: flex;
  justify-content: center;
  white-space: nowrap;
`;

const SearchGenreName = styled.div`
  position: absolute;
  font-size: 2rem;
  margin-top: 1rem;
  margin-left: 4rem;
`;
