import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import baseUrl from "../services/request";
import { User } from "../types/user";

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #101929;
  color: white;
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: white;
  background-color: #030e1f;
  color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h1`
  margin-top: 0.5rem;
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.025em;
`;

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: white;

  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
  }
`;

const Footer = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: white;
`;

const SignUpLink = styled.a`
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ setUser }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });

    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password,
      });
      console.log(res.data);
      setUser(res.data);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <Subtitle>Sign into your account</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="password">Password</Label>
              <ForgotPasswordLink href="/forgot-password">
                Forgot password?
              </ForgotPasswordLink>
            </LabelWrapper>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <CheckboxContainer>
            <StyledCheckbox
              id="remember"
              type="checkbox"
              //   checked={rememberMe}
              //   onChange={(e) => setRememberMe(e.target.checked)}
            />
            <CheckboxLabel htmlFor="remember">Remember me</CheckboxLabel>
          </CheckboxContainer>

          <Button type="submit">
            Sign in
            <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
          </Button>
        </Form>

        <Footer>
          Don't have an account?{" "}
          <SignUpLink onClick={() => navigate("/register")}>Sign up</SignUpLink>
        </Footer>
      </Card>
    </Container>
  );
};

export default Login;
