import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { register as apiRegister } from "../api/user";
import useInput from "../features/useInput";
import { page, form, cont, input, h1, h2, loginInput, regInput } from "../styles/login";
import Input from "../components/Input";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const login = useInput("");
  const password = useInput("");
  if (auth.is_authenticated) navigate("/");
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const resp = await apiRegister({
        username: login.value,
        password: password.value
    });
    if ("message" in resp) {
        // handle error
    }
    else {
        await auth.setAccessToken(resp.access_token);
        if (auth.is_authenticated) {
            navigate("/profile")
        }
        else {
            // handle error
        }
    }
  };
  return (
    <div css={[page]}>
      <form css={form} onSubmit={onSubmit}>
        <div css={cont}>
          <h1 css={h1}>регистрация</h1>
          <h2 css={h2}>зарегестрируйтесь что бы расширить функционал сервиса</h2>
        </div>
        <Input css={[cont, input]} placeholder="логин" type="text" {...login} />
        <Input
          css={[cont, input]}
          placeholder="пароль"
          type="password"
          {...password}
        />
        <Input css={[cont, loginInput]} type="submit" value="регистрация" />
        <Input css={[cont, regInput]} onClick={() => navigate("/login")} value="или войти" />
      </form>
    </div>
    
  );
};

export default RegisterPage