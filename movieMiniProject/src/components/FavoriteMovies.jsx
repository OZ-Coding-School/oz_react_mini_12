import { useUserData } from "../hooks/useUserData";
import MovieCard from "./MovieCard";

const FavoriteMovies = () => {
  const userData = useUserData();
  const favoriteMovieList =
    userData && JSON.parse(localStorage.getItem(`myMovies-${userData.sub}`));

  console.log(favoriteMovieList);
  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {favoriteMovieList &&
          favoriteMovieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
};

export default FavoriteMovies;
