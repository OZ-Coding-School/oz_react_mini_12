import React, { useState } from 'react';
import styled from 'styled-components';
import MovieListPage from "../pages/MovieListPage";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`로그인 시도: ${email}`);
  };

  return (
    <FormContainer>
      <h2>로그인</h2>
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
        <SubmitButton type="submit">로그인</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default Login;

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

    @media screen and (max-width: 1024px) {
      padding: 25px;
      margin: 60px auto;
    }

    @media screen and (max-width: 768px) {
      padding: 20px;
      margin: 40px 20px;
      max-width: 90%;
    }
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
    font-size: 15px;
    padding: 10px 14px;
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
