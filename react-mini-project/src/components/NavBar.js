import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: #000;
  color: #fff;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  font-family: 'Orbit', sans-serif;

  /* 모바일 */
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const NavLeft = styled.div`
  flex: 1;
`;

const StyledLogo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #8000ff;
  text-decoration: none;
`;

const SearchForm = styled.form`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: #1e1e1e;
  color: #fff;
  transition: 0.3s ease;
  width: 100%;
  max-width: 400px;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;

  /* 모바일 */
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const AuthButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  margin-left: 15px;
  border-radius: 5px;
  background-color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  /* 모바일 */
  @media screen and (max-width: 768px) {
    margin-left: 10px;
    font-size: 15px;
  }
`;

export {
  NavbarContainer,
  NavLeft,
  StyledLogo,
  SearchForm,
  SearchInput,
  NavRight,
  AuthButton
};
