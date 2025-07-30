import styled from "styled-components";

export const NavigatorContainer = styled.nav`
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
`;

export const NavigatorLogo = styled.span`
  color: #d61f3d;
  margin: 0 20px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 800;
  transform: translate(0, -3px);

  @media (max-width: 855px) {
    .logo-text {
      display: none;
    }
  }
`;

export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #333;
    text-decoration: none;
    margin: 0 1rem;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 1rem;
    font-weight: bold;
    color: black;
  }
  button {
    background-color: #d61f3d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    margin-right: 1rem;
  }
`;
