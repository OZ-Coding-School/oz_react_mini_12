import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Theme } from "../GlobalStyle";

export function isValid(key, formData) {
  switch (key) {
    case "email":
      return isValidEmail(formData.email);
    case "userName":
      return isValidName(formData.userName);
    case "password":
      return isValidPassword(formData.password);
    case "confirmPassword":
      return isValidConfirmPassword(
        formData.password,
        formData.confirmPassword
      );
  }
}

const isValidEmail = (email) => {
  //  /패턴/은 정규식 리터럴 규칙
  // ^ 문자열 시작
  // [^\s@] 공백(\s)이나 @ 없는 문자 하나(유저)
  // [^\s@]+ 공백없는 문자열(유저)
  //   @ 골뱅이
  // [^\s@]+ 공백없는 문자(도메인 파트)
  //   \. 마침표
  //   [^\s@]+ 공백없는 문자(도메인 끝부분 .com 같은거)
  // $ 문자열의 끝

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidName = (userName) => {
  const koReg = /^[가-힣]{2,6}$/;
  const enSingleReg = /^[a-zA-Z]{2,20}$/;
  const enReg = /^[a-zA-Z]{2,20}\s[a-zA-Z]{2,20}$/;

  return koReg.test(userName)
    ? true
    : enSingleReg.test(userName)
    ? true
    : enReg.test(userName)
    ? true
    : false;
};

const isValidPassword = (password) => {
  // \d digit
  // \w word
  // \s	space
  // \D	non-digit
  // \W	non-word
  // \S	non-space
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;

  return password.length >= 8 && passwordReg.test(password);
  // 8자 이상, 숫자 하나 이상, 대/소문자 하나 이상
};

const isValidConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export function useValidation(initialState) {
  const [validErr, setValidErr] = useState(initialState);

  const debouncedValidate = useCallback(
    debounce((name, formData) => {
      const isValidField = isValid(name, formData);
      setValidErr((prev) => ({
        ...prev,
        [name]: isValidField ? "valid" : "invalid",
      }));
    }, 500),
    []
  );

  return [validErr, debouncedValidate];
}

export function isAllValid(validErr) {
  return Object.values(validErr).every((status) => status === "valid");
}

export default function FormInput({
  type,
  name,
  value,
  placeholder,
  onChange,
  validation,
}) {
  return (
    <InputWrapper>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <ValidationMessage valid={validation}>
        {getValidationMessage(name, { [name]: value }, validation)}
      </ValidationMessage>
    </InputWrapper>
  );
}

export const getValidationMessage = (name, formData, validation) => {
  if (formData[name] === "") return "";

  const validationHints = {
    email: "올바른 이메일 주소를 입력해주세요.",
    userName: "특수문자를 포함하지 않는 이름을 입력해주세요.",
    password:
      "비밀번호는 8자 이상, 숫자 하나 이상, 대/소문자 하나 이상이어야 합니다",
    confirmPassword: "비밀번호가 일치하지 않습니다.",
  };

  return validation === "valid"
    ? "😎 valid!"
    : `😱 invalid : ${validationHints[name]}`;
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ValidationMessage = styled.span`
  position: absolute;
  color: ${(props) => (props.valid === "valid" ? "green" : "red")};
  font-size: 0.9rem;
  margin-top: 3.3rem;
  width: 110%;
`;

export const LogInContainer = styled.div`
  width: 30rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Theme("background")};
  color: ${Theme("text")};

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 2.5rem;

    input,
    button {
      font-family: "Gowun Batang";
      width: 25rem;
      padding: 0.5rem;
      font-size: 1.5rem;
      font-weight: 300;
      border-radius: 0.7rem;
    }

    input {
      border: 1px solid #c9c9c9a0;
      &:focus {
        outline: none;
        border: 1px solid #696969b3;
      }
    }
    button {
      cursor: pointer;
      font-weight: 600;
      border: none;
    }

    .OAuth_2 {
      display: flex;
      padding: 1rem;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      div {
        display: flex;
        justify-content:center;
        align-items: center;
        gap:1rem;
        padding: 1rem 2rem;
        border: 1px solid ${Theme("text")};
        border-radius: 0.5rem;
        font-size: 1.2rem;
        transition: all 0.15s ease;
        cursor: pointer;
        &:hover {
          background-color: ${Theme("cardBGHover")};
        }
        img{
          width:2rem;
        }
      }
    }
    .openSignUp {
      text-align: center;
      font-size: 1.1rem;
      a {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;
