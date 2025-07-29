import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavbarContainer,
  NavLeft,
  StyledLogo,
  SearchForm,
  SearchInput,
  NavRight,
  AuthButton,
} from './NavBar.js';
import useDebounce from '../hooks/useDebounce';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  // searchQuery : 검색창에 입력한 값을 실시간으로 저장하는 상태
  // 0.5초동안 변화가 없으면, navigate()실행!
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      navigate(`/?query=${debouncedSearchQuery.trim()}`);
      // trim(): 문자열의 양쪽 끝 공백제거 메서드 => 실수로 공백 입력할까봐!
    } else {
      navigate('/');
    }
  }, [debouncedSearchQuery]);
  return (
    <NavbarContainer>
      <NavLeft>
        <StyledLogo to="/">OZ무비</StyledLogo>
      </NavLeft>

      <SearchForm>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="영화 제목을 검색하세요"
        />
      </SearchForm>

      <NavRight>
        <AuthButton to="/login">로그인</AuthButton>
        <AuthButton to="/signup">회원가입</AuthButton>
      </NavRight>
    </NavbarContainer>
  );
};

export default NavBar;