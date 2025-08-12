import { useLoaderData, useNavigation } from "react-router";
import FavoriteButton from "../components/FavoriteButton";
import { useModeStore } from "../store/ModeStore";

const Detail = () => {
  const movieDetailData = useLoaderData();
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const navigation = useNavigation(); //  로딩상태를 알려주는 react-router hook
  const isLoading = navigation.state === "loading";
  const { isDark } = useModeStore();

  if (isLoading) return null; // 로딩일때 다태알패이지 안보이게 하기

  const getMovieReleaseYear = (movieReleaseDate) => {
    const date = new Date(movieReleaseDate);
    return date.getFullYear();
  };

  const movieReleaseYear = getMovieReleaseYear(movieDetailData.release_date);

  return (
    <article className="w-screen h-[calc(100vh-100px)] absolute bottom-0 flex flex-col justify-center items-center gap-5 z-50">
      <img
        className="scale-200 lg:w-screen lg:scale-100 lg:blur-[8px] blur-xs opacity-50 -z-50 absolute"
        src={baseUrl + movieDetailData.backdrop_path}
        alt={`${movieDetailData.title}의 포스터`}
      />
      <div
        className={`w-screen h-[90%] flex flex-col justify-center items-center gap-5 sm:flex-row ${
          isDark ? `bg-[#00000058]` : `bg-[#ffffff58]`
        } `}
      >
        <div className="relative">
          <img
            className={`w-[50%] max-w-[371px] min-w-[331px] max-h-[548px] opacity-70 sm:opacity-100 rounded-4xl ${
              isDark
                ? `shadow-[1px_1px_10px_10px_#ffffff55]`
                : `shadow-[1px_1px_10px_10px_#00000054]`
            }`}
            src={baseUrl + movieDetailData.poster_path}
            alt={`${movieDetailData.title}의 포스터`}
          />
          <FavoriteButton movie={movieDetailData} />
        </div>
        <div
          className={`${
            isDark ? `bg-[#00000078]` : `bg-[#ffffffa0]`
          } w-[100%] max-h-[387px] sm:w-[40%] absolute sm:relative sm:bg-[#ffffff00] flex flex-col items-start gap-3 overflow-y-scroll [&::-webkit-scrollbar]:hidden p-7`}
        >
          <div className="flex justify-evenly items-end gap-3">
            <h1 className="text-3xl font-extrabold">
              {movieDetailData.title}
              <span className="text-[20px] font-bold pl-2">{`(${movieReleaseYear})`}</span>
            </h1>
            <p className="text-[15px]">
              ⭐&nbsp;&nbsp;{movieDetailData.vote_average}
            </p>
          </div>
          <div className="flex text-[13px]">
            <span>
              {movieDetailData.genres && // 이걸 안하면 자꾸 오류남.-> 한번 지웠다가 다시 저장하면 실행됨.
                movieDetailData.genres.map((genre) => genre.name).join(` | `)}
            </span>
          </div>
          <p className="text-xl text-pretty opacity-60">
            {movieDetailData.overview}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Detail;
