import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, useSupabaseAuth } from '../hooks/supabaseSetting'; // supabase, useSupabaseAuth import
import './LoginForm.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useSupabaseAuth(); // 로그인 상태 관리

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!loginData.email || !loginData.password) {
      setMessage('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // Supabase 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      setMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    // 로그인 성공 시 user 상태 업데이트 및 페이지 이동
    setUser(data.user);
    setMessage('로그인 성공!');
    navigate('/');  // Layout.jsx가 있는 기본 경로로 이동
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginData.password}
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
        {message && <p className="login-message">{message}</p>}

        <div className="signup-redirect">
          <p>계정이 없으신가요?</p>
          <Link to="/signup" className="signup-link">회원가입 하기</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
