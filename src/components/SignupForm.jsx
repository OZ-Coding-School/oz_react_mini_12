// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../hooks/supabaseSetting';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z가-힣]+$/; // 한글+영어만
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return '모든 필드를 입력해주세요.';
    }
    if (!nameRegex.test(formData.name)) {
      return '이름은 한글 또는 영어만 입력 가능합니다.';
    }
    if (formData.password.length < 8 || formData.password.length > 12) {
      return '비밀번호는 8~12자여야 합니다.';
    }
    if (formData.password !== formData.confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const errorMsg = validateForm();
    if (errorMsg) {
      setMessage(errorMsg);
      return;
    }

    // Supabase 회원가입 처리
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name }, // 사용자 메타데이터에 이름 저장
      },
    });

    if (error) {
      console.error('회원가입 에러:', error.message);
      setMessage('회원가입 중 오류가 발생했습니다.');
      return;
    }

    setMessage('회원가입 성공! 이메일을 확인해주세요.');

    // 입력 필드 초기화
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    // 2초 후 로그인 페이지로 이동
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 (8~12자)"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
        {message && <p className="signup-message">{message}</p>}
      </form>
    </div>
  );
};

export default SignupForm;