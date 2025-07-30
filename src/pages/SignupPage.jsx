import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";

function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "이메일 형식으로 작성해주세요.";
    }

    if (!form.name || form.name.length < 2 || form.name.length > 8) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!form.password.match(/[A-Za-z]/) || !form.password.match(/\d/)) {
      newErrors.password = "영문 대문자/소문자 + 숫자의 조합 사용";
    }

    if (form.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (form.password !== form.confirm) {
      newErrors.confirm = "비밀번호가 일치하지 않습니다.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });

    if (!error) {
      alert("회원가입이 완료되었습니다. 이메일을 확인해주세요.");
      navigate("/login");
    } else {
      setError({ email: error.message });
    }
  };

  return (
    <div className="form-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* 이메일 */}
        <label>이메일</label>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className={`input ${error.email ? "error" : ""}`}
        />
        {error.email && <p className="error-text">{error.email}</p>}

        {/* 이름 */}
        <label>이름</label>
        <input
          type="text"
          name="name"
          placeholder="2~8자, 숫자, 한글, 영어만 사용"
          value={form.name}
          onChange={handleChange}
          className={`input ${error.name ? "error" : ""}`}
        />
        {error.name && <p className="error-text">{error.name}</p>}

        {/* 비밀번호 */}
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="영문 대문자/소문자 + 숫자의 조합 사용"
          value={form.password}
          onChange={handleChange}
          className={`input ${error.password ? "error" : ""}`}
        />
        {error.password && <p className="error-text">{error.password}</p>}

        {/* 비밀번호 확인 */}
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirm"
          placeholder="비밀번호 재입력"
          value={form.confirm}
          onChange={handleChange}
          className={`input ${error.confirm ? "error" : ""}`}
        />
        {error.confirm && <p className="error-text">{error.confirm}</p>}

        <button type="submit" className="submit-button">회원가입</button>
      </form>
    </div>
  );
}

export default SignupPage;