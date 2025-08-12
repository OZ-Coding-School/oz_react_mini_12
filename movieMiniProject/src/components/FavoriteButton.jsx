import { useState } from "react";
import { useFavoriteMovieListStore } from "../store/MovieListStore";
import { useUserData } from "../hooks/useUserData";
import { useNavigate } from "react-router";

const FavoriteButton = ({ movie }) => {
  const { favoriteMovieList, addToFavorites, removeFromFavorites } =
    useFavoriteMovieListStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const userData = useUserData();
  const navigate = useNavigate();

  console.log(userData);
  userData &&
    localStorage.setItem(
      `myMovies-${userData.sub}`,
      JSON.stringify([...favoriteMovieList])
    );

  return (
    <>
      <button
        onClick={() => {
          if (!userData) {
            navigate(`/login`);
            alert(`로그인이 필요합니다`);
          }
          if (isFavorite === false) {
            addToFavorites(movie);
            setIsFavorite(true);
          }
          if (isFavorite === true) {
            removeFromFavorites(movie);
            setIsFavorite(false);
          }
        }}
        className="bg-[#ffffff49] rounded-full size-10 text-2xl absolute top-[20px] left-[20px]"
      >
        {isFavorite ? `❤️` : `🖤`}
      </button>
      <button></button>
    </>
  );
};

export default FavoriteButton;
