import { NavLink, useLoaderData } from "react-router";
import { useModeStore } from "../store/ModeStore";
import SwiperMovie from "../components/SwiperMovie";
import MainBanner from "../components/MainBanner";

const Main = () => {
  const { nowPlaying, upcoming, topRated, popular } = useLoaderData();
  const { isDark } = useModeStore();

  const nowPlayingMoviesList = nowPlaying.results.filter(
    (el) => el.adult === false
  );
  const upcomingMoviesList = upcoming.results.filter(
    (el) => el.adult === false
  );
  const topRatedMoviesList = topRated.results.filter(
    (el) => el.adult === false
  );
  const popularMoviesList = popular.results.filter((el) => el.adult === false);

  return (
    <>
      <div className={`w-screen h-[calc(100vh-100px)] pt-[120px]`}>
        <div>
          <NavLink to={"now-playing"}>
            <h2 className="text-2xl pl-5 pb-5">현재 상영작</h2>
          </NavLink>
          <MainBanner moviesList={nowPlayingMoviesList} />
        </div>
        <div>
          <NavLink to={"upcoming"}>
            <h2 className="text-2xl pl-5 pb-5">개봉 예정작</h2>
          </NavLink>
          <SwiperMovie moviesList={upcomingMoviesList} />
        </div>
        <div>
          <NavLink to={"top-rated"}>
            <h2 className="text-2xl pl-5 pb-5">추천 영화</h2>
          </NavLink>
          <SwiperMovie moviesList={topRatedMoviesList} />
        </div>
        <div>
          <NavLink to={"popular"}>
            <h2
              className={`${
                isDark ? `bg-black` : `bg-[rgb(253,250,248)]`
              } text-2xl pl-5 pb-5`}
            >
              인기 영화
            </h2>
          </NavLink>
          <SwiperMovie moviesList={popularMoviesList} />
        </div>
      </div>
    </>
  );
};

export default Main;
