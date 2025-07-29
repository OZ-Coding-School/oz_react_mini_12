import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert(`회원가입 시도: ${email}`);
  };

  return (
    <FormContainer>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <Input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <Input 
          type="password" 
          placeholder="비밀번호 확인" 
          value={passwordConfirm} 
          onChange={e => setPasswordConfirm(e.target.value)} 
          required 
        />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default Signup;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background: #222;
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px #000;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
  /* 태블릿 대응 */
  @media screen and (max-width: 1024px) {
    margin: 60px auto;
    padding: 25px;
  }

  /* 모바일 대응 */
  @media screen and (max-width: 768px) {
    margin: 40px 16px;
    padding: 20px;
    max-width: 90%;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 10px 14px;
    font-size: 15px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #8000ff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #a64dff;
  }
  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 15px;
  }
`;