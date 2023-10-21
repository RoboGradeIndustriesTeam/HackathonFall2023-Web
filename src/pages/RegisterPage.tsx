import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { register as apiRegister } from "../api/user";
import useInput from "../features/useInput";
import { css } from "@emotion/react";

const page = css`
font-family: Inter;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const form = css`
display: flex;
flex-direction: column;
max-width: 400px;
width: 100%
`;

const cont = css`
background-color: #D9D9D9;
padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
text-align: left;
border-radius: 5px;
max-width: 372px;
width: 100%
`;

const input = css`
border-bottom: 2px #858585 solid; 
`;

const h1 = css`
font-size: 24px;
font-weight: 600;
`;

const h2 = css`
font-size: 14px;
font-weight: 400;
`;
const loginInput = css`
max-width: 400px;
font-size: 16px;
font-weight: 800;
text-decoration: underline;
cursor: pointer;
opacity: 1;
transition: opacity .3s;
&:hover {
  opacity: .7;
}
`
const regInput = css`
cursor: pointer;
font-size: 16px;
font-weight: 400;
text-decoration: underline;
transition: opacity .3s;
&:hover {
  opacity: .7;
}
max-width: 372px;
`

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
        <input css={[cont, input]} placeholder="логин" type="text" {...login} />
        <input
          css={[cont, input]}
          placeholder="пароль"
          type="password"
          {...password}
        />
        <input css={[cont, loginInput]} type="submit" value="регистрация" />
        <input css={[cont, regInput]} onClick={() => navigate("/login")} value="или войти" />
      </form>
    </div>
    
  );
};

export default RegisterPage