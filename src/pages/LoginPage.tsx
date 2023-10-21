import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { login as apiLogin } from "../api/user";
import useInput from "../features/useInput";
import { page, form, cont, input, h1, h2, loginInput, regInput } from "../styles/login";

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
        <input css={[cont, input]} placeholder="логин" type="text" {...login} />
        <input
          css={[cont, input]}
          placeholder="пароль"
          type="password"
          {...password}
        />
        <input css={[cont, loginInput]} type="submit" value="войти" />
        <input css={[cont, regInput]} onClick={() => navigate("/register")} value="или регистрация" />

      </form>
    </div>
  );
};

export default LoginPage;
