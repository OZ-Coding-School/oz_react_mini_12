import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../components/MovieCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonCardContainer, Container } from "../styles/Skeleton.styles";
import { fetchPopularMovie } from "../features/movie/movieThunk";
import useThrottle from "../hooks/useThrottle";

function Main() {
  const dispatch = useDispatch();
  const { data, loading, currentPage } = useSelector((state) => state.movie);
  const movies = data?.results;
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (initialLoadRef.current) {
      dispatch(fetchPopularMovie(1));
      dispatch(fetchPopularMovie(2));
      initialLoadRef.current = false;
    }
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 500 && !loading) {
      dispatch(fetchPopularMovie(currentPage + 1));
    }
  }, [loading, currentPage, dispatch]);

  const throttledHandleScroll = useThrottle(handleScroll);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  if (loading && movies.length === 0) {
    return (
      <SkeletonTheme baseColor="#7f7f7f" highlightColor="#444">
        <Container>
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonCardContainer key={index}>
              <Skeleton height={169} />
              <div>
                <Skeleton height={18} width={`85%`} />
              </div>
            </SkeletonCardContainer>
          ))}
        </Container>
      </SkeletonTheme>
    );
  }

  return (
    <Container>
      {movies?.map((list) => (
        <MovieCard
          key={list.id}
          id={list.id}
          url={list.backdrop_path}
          title={list.title}
          rating={list.vote_average}
        />
      ))}
      {loading && movies.length > 0 && (
        <SkeletonTheme baseColor="#7f7f7f" highlightColor="#444">
          <Container>
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCardContainer key={index}>
                <Skeleton height={169} />
                <div>
                  <Skeleton height={18} width={`85%`} />
                </div>
              </SkeletonCardContainer>
            ))}
          </Container>
        </SkeletonTheme>
      )}
    </Container>
  );
}

export default Main;
