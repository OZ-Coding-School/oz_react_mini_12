// src/pages/Login.jsx
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import useSupabaseAuth from "../supabase/useSupabaseAuth";
import { useUser } from "../context/UserContext.jsx";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login, getUserInfo, loginWithKakao, loginWithGoogle } = useSupabaseAuth();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempErrors = {};
    if (!form.email) tempErrors.email = "이메일을 입력하세요!";
    if (!form.password) tempErrors.password = "비밀번호를 입력하세요!";
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length) return;

    const { user, error } = await login({ email: form.email, password: form.password });
    if (error) {
      // 영어 메시지를 한글 메시지로 변환
      if (error.message === "Invalid login credentials") {
        setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setLoginError(error.message || "로그인에 실패했습니다.");
      }
    } else {
      // 로그인 성공 시 완전한 유저 정보 다시 받아서 전역 상태 업데이트
      const fullUserInfo = await getUserInfo();
      setUser(fullUserInfo);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #eee",
        borderRadius: 12,
        background: "#181818",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: 22, textAlign: "center" }}>로그인</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        {loginError && <div style={{ color: "#ff7070", marginBottom: 8 }}>{loginError}</div>}
        <button
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1.05rem",
            borderRadius: 8,
            background: "#ffc107",
            border: "none",
            color: "#222",
            fontWeight: 700,
            marginTop: 6,
          }}
        >
          로그인
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <button
          onClick={loginWithGoogle}
          style={{
            margin: "5px 0",
            padding: "8px 0",
            width: "100%",
            background: "#eee",
            color: "#222",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Google로 로그인
        </button>
        <button
          onClick={loginWithKakao}
          style={{
            margin: "5px 0",
            padding: "8px 0",
            width: "100%",
            background: "#fee500",
            color: "#222",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Kakao로 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
