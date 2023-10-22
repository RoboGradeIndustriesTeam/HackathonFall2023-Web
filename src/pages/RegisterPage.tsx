import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { register as apiRegister } from "../api/user";
import useInput from "../features/useInput";
import { logo, page, form, cont, input, h1, h2, loginInput, regInput } from "../styles/login";
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
        <div>
          <h1 css={logo} onClick={
            ()=>{
              navigate('/')
            }
          }>статейник</h1>
        </div>
        <div>
          <h1 css={h1}>Регистрация</h1>
        </div>
        <Input css={[cont, input]} placeholder="Введите логин" type="text" {...login} />
        <Input
          css={[cont, input]}
          placeholder="Введите пароль"
          type="password"
          {...password}
        />
             <div css={[regInput]} onClick={() => navigate("/login")}>Или войдите</div>
        <input css={[loginInput]} type="submit" value="Регистрация" />
   
      </form>
    </div>
    
  );
};

export default RegisterPage