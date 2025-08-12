import { useEffect } from "react";
import { useUserData } from "../hooks/useUserData";
import { useLoginStore } from "../store/LoginStore";
import { useNavigate } from "react-router";
import { useModeStore } from "../store/ModeStore";
import profileImg from "../assets/profile.png";
import FavoriteMovies from "../components/FavoriteMovies";

function MyPage() {
  const userData = useUserData();
  const { isUser, setIsUser } = useLoginStore();
  const { isDark } = useModeStore();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 안하고 my-page 갈 경우 alert가 안뜸.
    userData && setIsUser(true); // 없으면 로그인페이지로 넘어감.
    // userData가 없으면 로그인 상태에서 my-page에서 새로고침시 alert 뜨고 login 페이지로 넘어감
    userData && !isUser && (navigate(`/login`), alert(`로그인이 필요합니다`));
  }, [userData, isUser, setIsUser, navigate]);

  if (!isUser) return null;

  console.log(isUser);

  return (
    <div className="pt-[150px] flex items-start">
      <div className="w-[300px] pt-24 flex flex-col justify-center items-center gap-1 p-8">
        {userData && userData.avatar_url === undefined && (
          <img
            src={profileImg}
            alt="profile 이미지"
            className={`${isDark ? `invert` : ``} size-30 rounded-full`}
          />
        )}
        {userData && userData.avatar_url && (
          <img
            src={userData.avatar_url}
            alt="profile 이미지"
            className="size-30 rounded-full"
          />
        )}
        <p className="pt-5">{userData && userData.name}</p>
        <p className={isDark ? `text-[#ffffff7b]` : `text-[#00000072]`}>
          {userData && userData.email}
        </p>
      </div>
      <div
        className={`${
          isDark ? `bg-[#ffffff3b]` : `bg-[#0523483b]`
        } w-[calc(100vw-340px)] min-w-[450px] mt-5 mr-10 p-[35px_40px] rounded-4xl flex flex-col items-start`}
      >
        <p
          className={`${
            isDark ? `border-[#ffffff77]` : `border-[#00000077]`
          } w-[100%] border-b-2  pb-2 mb-4`}
        >
          {" "}
          My Movies 🎞
        </p>
        <FavoriteMovies />
      </div>
    </div>
  );
}

export default MyPage;
