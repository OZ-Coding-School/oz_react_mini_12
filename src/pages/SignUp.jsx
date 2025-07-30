import { useRef, useState } from "react";
import FormInput, { isAllValid, LogInContainer, useValidation } from "../util/validation";
import { signUp } from "../util/auth";
import { useLoginStore } from "../store/logIn_store";

export default function SignUp() {
  const { login } = useLoginStore();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [validErr, debouncedValidate] = useValidation({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const fields = [
    { name: "email", type: "email", placeholder: "이메일" },
    { name: "userName", type: "text", placeholder: "이름" },
    {
      name: "password",
      type: "password",
      placeholder:
        "비밀번호",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "비밀번호 확인",
    },
  ];

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData(formRef.current);
  const formObj = Object.fromEntries(form);

  const valid = isAllValid(validErr);

  try {
    const response = await signUp(formObj, valid);
    console.log("회원가입 성공!", response);
    login(response.user);
    
  } catch (error) {
    console.log(error.message);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    debouncedValidate(name, updatedFormData);
  };

  return (
    <LogInContainer>
      <h1>회원가입</h1>
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
        <button type="submit">회원가입</button>
      </form>
    </LogInContainer>
  );
}
