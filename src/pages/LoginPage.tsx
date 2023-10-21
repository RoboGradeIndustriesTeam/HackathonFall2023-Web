import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { login as apiLogin } from "../api/user";
import useInput from "../features/useInput";
import { page, form, cont, input, h1, h2, loginInput, regInput } from "../styles/login";
import Container from "../components/Container";
import Input from "../components/Input";
import { css } from "@emotion/react";

const loginVk = css`
color: white;
background: #0077FF;

padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
text-align: left;
border-radius: 5px;
width: 100%;
`

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const login = useInput("");
  const password = useInput("");
  if (auth.is_authenticated) navigate("/");
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const resp = await apiLogin({
      username: login.value,
      password: password.value,
    });
    if ("message" in resp) {
      // handle error
    } else {
      await auth.setAccessToken(resp.access_token);
      if (auth.is_authenticated) {
        navigate("/profile");
      } else {
        // handle error
      }
    }
  };
  return (
    <div css={page}>
      <form css={form} onSubmit={onSubmit}>
        <div css={cont}>
          <h1 css={h1}>вход в ученую запись</h1>
          <h2 css={h2}>войдите что бы расширить функционал сервиса</h2>
        </div>
        <Input css={[cont, input]} placeholder="логин" type="text" {...login} />
        <Input
          css={[cont, input]}
          placeholder="пароль"
          type="password"
          {...password}
        />
        <Input css={[loginInput]} type="submit" value="войти" />
        <Input css={[regInput]} onClick={() => navigate("/register")} value="или регистрация" />
        <button css={[regInput, loginVk]} onClick={() => {
          window.location.href = `${import.meta.env.VITE_APP_URL || "http://127.0.0.1:3000"}/auth/oauth/vk?redirect=${location.origin + "/oauthRedirect"}`
        }}>вк</button>
      </form>
    </div>
  );
};

export default LoginPage;
