import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { regExp } from "../constants/regularExpression";
import { errorMessage } from "../constants/errorMessage";
import { useLoginStore } from "../store/LoginStore";
import { useModeStore } from "../store/ModeStore";
import Input from "../components/Input";
import googleImg from "../assets/google.png";
import kakaoImg from "../assets/kakao.png";
import githubImg from "../assets/github.png";

const Login = () => {
  const [emailInput, setEmailInput] = useState(``);
  const [passwordInput, setPasswordInput] = useState(``);
  const navigate = useNavigate();
  const {
    isUser,
    logInWithEmail,
    logInWithGoogle,
    logInWithKakao,
    logInWithGithub,
  } = useLoginStore();
  const { isDark } = useModeStore();

  // console.log(isUser);
  // console.log(isDark);

  return (
    <>
      <form
        name="login"
        onSubmit={(e) => {
          logInWithEmail(e, emailInput, passwordInput);
          isUser && navigate(`/`);
        }}
        className="pt-[200px] flex flex-col justify-center items-center gap-10"
      >
        <h1 className="text-5xl">로그인</h1>
        <div className="flex gap-8">
          <div className="flex flex-col gap-7">
            <Input
              type={`email`}
              placeHolder={`e-mail을 입력하세요`}
              value={emailInput}
              setValue={setEmailInput}
              pattern={regExp.email}
              errorMessage={errorMessage.email}
            />
            <Input
              type={`password`}
              placeHolder={`비밀번호를 입력하세요`}
              value={passwordInput}
              setValue={setPasswordInput}
              pattern={regExp.password}
              errorMessage={errorMessage.password}
            />
          </div>
          <button
            type="submit"
            className={`w-[108px] rounded-3xl text-xl ${
              isDark ? `bg-[#ffffff7a]` : `bg-[#0000003d]`
            }`}
          >
            Login
          </button>
        </div>
        <div className="flex gap-8">
          <img
            src={googleImg}
            alt="google 로고"
            className="size-11"
            onClick={logInWithGoogle}
          />
          <img
            src={kakaoImg}
            alt="kakao talk 로고"
            className="size-12"
            onClick={logInWithKakao}
          />
          <img
            src={githubImg}
            alt="github 로고"
            className={`size-12 ${isDark ? `invert` : ``}`}
            onClick={logInWithGithub}
          />
        </div>

        <p>
          {" "}
          OZ mate가 아니신가요?!{" "}
          <NavLink to={`/signup`} className={`text-[#00aaff] animate-pulse`}>
            OZ mate 되기!
          </NavLink>
        </p>
      </form>
    </>
  );
};

export default Login;
