// src/pages/SignUp.jsx
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import useSupabaseAuth from "../supabase/useSupabaseAuth";
import { useUser } from "../context/UserContext.jsx";

// 이름: 2~8자, 한글/영어/숫자만
function validateName(name) {
  return /^[가-힣a-zA-Z0-9]{2,8}$/.test(name);
}

// 이메일 형식
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 비밀번호: 8자 이상, 영문+숫자
function validatePassword(password) {
  return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function SignUp() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signUp, login, getUserInfo } = useSupabaseAuth();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(form.userName)) {
      newErrors.userName = "이름은 2~8자, 한글/영어/숫자만 가능!";
    }
    if (!validateEmail(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!validatePassword(form.password)) {
      newErrors.password = "8자 이상, 영문과 숫자 조합!";
    }
    if (form.password !== form.passwordCheck) {
      newErrors.passwordCheck = "비밀번호가 일치하지 않습니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 회원가입 시도
    const { user, error } = await signUp({
      email: form.email,
      password: form.password,
      userName: form.userName,
    });

    if (error) {
      alert("회원가입 실패: " + error.message);
      return;
    }

    // 자동 로그인 시도
    const { user: loggedInUser, error: loginError } = await login({
      email: form.email,
      password: form.password,
    });

    if (loginError) {
      alert("회원가입은 성공했으나 자동 로그인에 실패했습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return;
    }

    // 완전한 유저 정보 가져와서 전역 상태 업데이트
    const fullUserInfo = await getUserInfo();
    setUser(fullUserInfo);

    navigate("/"); // 로그인 성공 후 메인 페이지로 이동
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
      <h2 style={{ marginBottom: 22, textAlign: "center" }}>회원가입</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          label="이름"
          type="text"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          error={errors.userName}
        />
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
        <FormInput
          label="비밀번호 확인"
          type="password"
          name="passwordCheck"
          value={form.passwordCheck}
          onChange={handleChange}
          error={errors.passwordCheck}
        />
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
            cursor: "pointer",
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
