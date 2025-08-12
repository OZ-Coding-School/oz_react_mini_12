import profile from "../assets/profile.png";
import logo from "../assets/logo.png";
import darkToggle from "../assets/darkToggle.png";
import lightToggle from "../assets/lightToggle.png";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useModeStore } from "../store/ModeStore";
import { supabase } from "../supabase";
import { useLoginStore } from "../store/LoginStore";
import { useDebounce } from "../hooks/usdDebounce";
import { useUserData } from "../hooks/useUserData";

const NavBar = () => {
  const [searchedString, setSearchedString] = useState(``);
  const [searchString, setSearchString] = useState("");
  const [profileClick, setProfileClick] = useState(false);
  const { isDark, toggleMode } = useModeStore();
  const { isUser, setIsUser, signOut } = useLoginStore();
  const debounceValue = useDebounce(searchString);
  const userData = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsUser(true);
          // console.log("✅ 로그인 상태:", session.user);
        } else {
          setIsUser(false);
          // console.log("❌ 로그아웃됨");
          // console.log(isUser);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setIsUser]);

  useEffect(() => {
    if (debounceValue) {
      navigate(`search?name=${debounceValue}`);
    } else {
      navigate(`/`);
    }
    // return setSearchedString(``);
  }, [debounceValue, navigate]);

  const handleProfile = () => {
    setProfileClick((prev) => !prev);
  };

  return (
    <nav
      className={`w-screen h-24 p-[0_40px_15px_30px] flex justify-between items-end fixed z-[999]`}
    >
      <NavLink to={"/"} end>
        <img
          className={`${isDark ? `invert` : ``} size-15 rounded-full mr-[20px]`}
          src={logo}
          alt="OZ Movie 로고"
        />
      </NavLink>
      <input
        value={searchedString}
        type="text"
        className={`w-[60%] h-10 rounded-full p-[0_20px] ${
          isDark ? `bg-[#ffffff80] ` : `bg-[#0000003d]`
        }`}
        placeholder="🔍 영화 제목을 검색하세요"
        onChange={(e) => {
          setSearchString(e.target.value);
          setSearchedString(e.target.value);
        }}
        // onKeyDown={(e) => {
        //   // enter 쳤을때 해당 페이지로 이동
        //   if (e.key === `Enter`) {
        //     console.log(searchString);
        //     const value = searchString.trim();
        //     if (!value) {
        //       navigate(`/`);
        //       return;
        //     }
        //     navigate(`/search?name=${value}`);
        //     setSearchedString(``);
        //   }
        // }}
      />
      <div className="flex items-end gap-2">
        <div className="flex">
          {isDark && (
            <img
              src={lightToggle}
              alt="라이트모드 전환 버튼"
              className="invert size-7"
              onClick={toggleMode}
            />
          )}
          {!isDark && (
            <img
              src={darkToggle}
              alt="다크모드 전환 버튼"
              className="size-7"
              onClick={toggleMode}
            />
          )}
        </div>
        {!isUser && (
          <div className="w-12.5 items-end gap-3 text-[15px] ml-[10px] hidden sm:flex sm:flex-col">
            <button onClick={() => navigate(`/login`)}>LogIn</button>
          </div>
        )}
        {isUser && userData && userData.avatar_url === undefined && (
          <img
            src={profile}
            alt="프로필 사진"
            className="invert size-11 ml-[16px] rounded-full"
            onClick={handleProfile}
          />
        )}
        {isUser && userData && userData.avatar_url && (
          <img
            src={userData.avatar_url}
            alt="프로필 사진"
            className="size-11 ml-[16px] rounded-full"
            onClick={handleProfile}
          />
        )}
        {profileClick && (
          <div
            className={`${
              isDark ? `bg-[#4d4d4dc8] ` : `bg-[#dcd9d9c3] `
            } w-30 flex flex-col justify-center items-center p-1 absolute right-10 top-[90px] rounded-[5px]`}
          >
            <p
              className={`${
                isDark
                  ? `text-[#ffffffc8] border-[#ffffff7b]`
                  : `text-[#000000c8] border-[#3636367b]`
              } w-[100%] text-center pb-2 border-b-2 `}
            >
              {userData.name} 님
            </p>
            <NavLink
              to={`/my-page`}
              onClick={handleProfile}
              className="w-[100%]"
            >
              <p
                className={`${
                  isDark
                    ? `text-[#ffffff87] hover:bg-[#495a8ccd]`
                    : `text-[#00000099] hover:bg-[#7396ffb1]`
                } text-center active:text-[#0f2374cf] p-[8px_0]`}
              >
                My page
              </p>
            </NavLink>
            <p
              onClick={async () => {
                const result = await signOut();
                handleProfile();
                result && navigate(`/`);
              }}
              className={`${
                isDark
                  ? `text-[#ffffff87] hover:bg-[#495a8ccd]`
                  : `text-[#00000099] hover:bg-[#7396ffb1]`
              } w-[100%] text-center  active:text-[#0f2374cf] border-[#8484847b] border-t-2 p-[8px_0]`}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
