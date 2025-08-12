import { NavLink, useRouteError } from "react-router";
import logo from "../assets/logo.png";
import { useModeStore } from "../store/ModeStore";

const Error = () => {
  const error = useRouteError();
  const { isDark } = useModeStore();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center m-auto">
      <NavLink to={"/"} end>
        <div className="w-[140px] flex justify-between items-center absolute top-5 left-5">
          <span>{`< Back to`}</span>
          <img
            className={`${isDark ? `invert` : ``} size-15 rounded-full`}
            src={logo}
            alt="OZ Movie 로고"
          />
        </div>
      </NavLink>
      <h1 className="text-[#681d1d] text-5xl font-extrabold">Error</h1>
      <p className="w-[80%] p-5 text-pretty">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
