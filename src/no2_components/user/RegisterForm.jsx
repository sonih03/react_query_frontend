import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterUser } from '../../no3_store/hooks/useUser';

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  email: "",
  city: ""
}

const RegisterForm = () => {
  const [user, setUser] = useState(initialState);
  const registerMutation = useRegisterUser();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { confirmPassword, ...userData } = user;
    try{
      registerMutation.mutate(userData)
      alert("회원가입 성공")
      navigate("/login")
    }
    catch{
      alert("회원가입 실패")
    }
  }

  return (
    <Container>

      <Form onSubmit={handleSubmit}>

        <Logo>MySystem</Logo>

        <Title>회원가입</Title>

        <Description>
          새로운 계정을 생성하세요.
        </Description>

        <InputGroup>
          <Label>아이디</Label>

          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="아이디 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>

          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>비밀번호 확인</Label>

          <Input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 다시 입력"
          />
        </InputGroup>
        <InputGroup>
          <Label>나이</Label>

          <Input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="나이 입력"
          />
        </InputGroup>
        <InputGroup>
          <Label>이메일</Label>

          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="이메일 입력"
          />
        </InputGroup>
        <InputGroup>
          <Label>도시</Label>

          <Input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="도시 입력"
          />
        </InputGroup>

        <RegisterButton>
          회원가입
        </RegisterButton>

        <Divider />

        <LoginButton
          type="button"
          onClick={() => navigate("/login")}
        >
          이미 회원이신가요? 로그인
        </LoginButton>

      </Form>

    </Container>
  )
}

export default RegisterForm;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #eef2f7;
`

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  background: linear-gradient(135deg, rgba(224, 231, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 
    inset 0 3px 5px rgba(255, 255, 255, 0.6),
    inset 0 -5px 12px rgba(255, 255, 255, 0.2),
    0 15px 30px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(224, 231, 255, 0.4);
  display: flex;
  flex-direction: column;
`

const Logo = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
`

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 10px;
`

const Description = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 15px;
  margin-bottom: 32px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-size: 15px;
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #0f172a;
  box-shadow: inset 0 1.5px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:focus{
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.5);
  }
`

const BaseButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 9999px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
`

const RegisterButton = styled(BaseButton)`
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(139, 92, 246, 0.25) 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 
    0 15px 25px rgba(139, 92, 246, 0.15), 
    inset 0 2.5px 3px rgba(255, 255, 255, 0.75), 
    inset 0 -5px 7px rgba(255, 255, 255, 0.4), 
    inset 0 4px 4px rgba(139, 92, 246, 0.15);
  margin-top: 8px;

  &:hover{
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.75) 0%, rgba(139, 92, 246, 0.35) 100%);
    transform: translateY(-1px);
    box-shadow: 0 15px 25px rgba(168, 85, 247, 0.25), inset 0 2.5px 3px rgba(255, 255, 255, 0.5);
  }
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
  margin: 24px 0;
`

const LoginButton = styled(BaseButton)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  color: #334155;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);

  &:hover{
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%);
    border-color: rgba(255, 255, 255, 0.5);
  }
`