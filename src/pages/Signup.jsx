// src/pages/Signup.jsx
import React, { useState } from 'react';
import { signUp } from '../hooks/useSupabaseAuth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirm: '', userName: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signUp({ email: form.email, password: form.password, userName: form.userName });
      alert('회원가입 완료! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input name="userName" placeholder="이름" value={form.userName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required />
        <input name="confirm" type="password" placeholder="비밀번호 확인" value={form.confirm} onChange={handleChange} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
