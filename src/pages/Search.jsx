import { useState, useEffect } from "react";
import { MovieCardSkeleton, MovieGrid } from "./Main";
import {  MovieCard } from "../components/MovieCard";
import { useParams } from "react-router-dom";
import { searchMoviesByTitle } from "../api/tmbi";

export default function Search() {
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useParams(); // useParams()에서 쿼리 추출 (URL: /search/:query)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const result = await searchMoviesByTitle(query);
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
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]); // query가 변경될 때마다 검색 실행

  return (
    <MovieGrid>
      {isLoading ? (
        // 로딩 중일 때 스켈레톤 UI 표시
        Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))
      ) : error ? (
        // 에러 발생 시 메시지 표시
        <div>{error}</div>
      ) : searchList.length === 0 ? (
        // 검색 결과가 없을 때
        <div>검색 결과가 없습니다.</div>
      ) : (
        // 검색 결과 표시
        searchList.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </MovieGrid>
  );
}
