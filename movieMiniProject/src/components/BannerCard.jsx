import { NavLink } from "react-router";
import { useModeStore } from "../store/ModeStore";

const BannerCard = ({ movie }) => {
  const { isDark } = useModeStore();
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <NavLink to={`/details/${movie.id}`}>
      <div
        className={`${
          isDark
            ? `hover:shadow-[1px_1px_10px_10px_#ffffff4e]`
            : `hover:shadow-[1px_1px_10px_10px_#0000004e]`
        } w-[200px] rounded-2xl flex flex-col justify-center items-center m-2 relative hover:scale-110 hover:z-50`}
      >
        <img
          className="w-[200px] rounded-2xl"
          src={baseUrl + movie.poster_path}
          alt={`${movie.title}의 포스터`}
        />
      </div>
    </NavLink>
  );
};

export default BannerCard;
