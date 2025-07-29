import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../components/NavBar.jsx";
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #121212;
  min-height: 100vh;
  color: #fff;
  font-family: 'Orbit', sans-serif;
`;

const Content = styled.div`
  /* PC */
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;

  /* 태블릿 */
  @media screen and (max-width: 1024px) {
    padding: 20px;
    max-width: 90%;
  }

  /* 모바일 */
  @media screen and (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <NavBar />
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default Layout;