import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const navigate = useNavigate();  // useNavigate 추가

  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!email.includes("@")) {
      newErrors.email = "올바른 이메일 양식으로 입력해주세요.";
    }
    if (password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    setError(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setError({ email: "", password: "" });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError({ email: "", password: "이메일 또는 비밀번호가 잘못되었습니다." });
    } else {
      // 로그인 성공 시 홈으로 이동
      navigate("/");
    }
  };

  return (
    <div className="form-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`input ${error.email ? "error" : ""}`}
        />
        {error.email && <p className="error-text">{error.email}</p>}

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`input ${error.password ? "error" : ""}`}
        />
        {error.password && <p className="error-text">{error.password}</p>}

        <button type="submit" className="submit-button">로그인</button>
      </form>

      <p className="form-bottom-text">
        Movie App이 처음이신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
}

export default LoginPage;