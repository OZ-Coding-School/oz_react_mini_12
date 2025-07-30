import { useRef, useState } from "react";
import FormInput, { isAllValid, LogInContainer, useValidation } from "../util/validation";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/logIn_store";
import { signIn } from "../util/auth";

export default function LogIn({ backgroundLocation }) {
  const navigate = useNavigate();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validErr, debouncedValidate] = useValidation({
    email: "",
    password: "",
  });
  const fields = [
    { name: "email", type: "email", placeholder: "이메일" },
    {
      name: "password",
      type: "password",
      placeholder: "비밀번호",
    },
  ];
  const { login } = useLoginStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    debouncedValidate(name, updatedFormData);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData(formRef.current);
  const formObj = Object.fromEntries(form);

  const valid = isAllValid(validErr);

  try {
    const response = await signIn(formObj, valid);
    console.log("로그인 성공!", response);
    login(response.user);

  } catch (error) {
    console.log(error.message);
  }
};


  const openSignUp = () => {
    navigate("/signup", { state: { backgroundLocation } });
  };

  return (
    <LogInContainer>
      <h1>로그인</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        {fields.map(({ name, type, placeholder }) => (
          <FormInput
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            validation={validErr[name]}
          ></FormInput>
        ))}
        <button type="submit">로그인</button>
        <div className="openSignUp">
          오즈 무비가 처음이신가요? <a onClick={openSignUp}>회원가입</a>
        </div>
      </form>
    </LogInContainer>
  );
}

