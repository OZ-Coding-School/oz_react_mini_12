import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AuthenticationContainer,
  AuthenticationInput,
  TextDiv,
  AuthenticationButton,
  ErrorText,
} from "../styles/Authentication.sytles";
import { useSupabaseAuth } from "../supabase";

const validate = ({ userName, email, password, passwordConfirm }) => {
  const errors = {};

  if (!/^[a-zA-Z]{2,20}$/.test(userName)) {
    errors.userName = "2-20 characters long and contain only English letters";
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}$/.test(password)) {
    errors.password =
      "8–20 characters with uppercase, lowercase, and a number.";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match.";
  }

  return errors;
};

function SignUp() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const { userName, email, password } = form;
      const { error } = await signUp({ email, password, userName });
      if (error) throw error;
      navigate("/signin");
    } catch (error) {
      setErrors({
        apiError: error.message || "An error occurred during sign up.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationContainer as="form" onSubmit={handleSignUp} noValidate>
      <TextDiv>Name</TextDiv>
      <AuthenticationInput
        type="text"
        name="userName"
        value={form.userName}
        onChange={handleChange}
      />
      <ErrorText $hasError={!!errors.userName}>{errors.userName}</ErrorText>

      <TextDiv>Email</TextDiv>
      <AuthenticationInput
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <ErrorText $hasError={!!errors.email}>{errors.email}</ErrorText>

      <TextDiv>Password</TextDiv>
      <AuthenticationInput
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <ErrorText $hasError={!!errors.password}>{errors.password}</ErrorText>

      <TextDiv>Confirm Password</TextDiv>
      <AuthenticationInput
        type="password"
        name="passwordConfirm"
        value={form.passwordConfirm}
        onChange={handleChange}
      />
      <ErrorText $hasError={!!errors.passwordConfirm}>
        {errors.passwordConfirm}
      </ErrorText>

      <AuthenticationButton type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </AuthenticationButton>
      <ErrorText $hasError={!!errors.apiError}>{errors.apiError}</ErrorText>
    </AuthenticationContainer>
  );
}

export default SignUp;
