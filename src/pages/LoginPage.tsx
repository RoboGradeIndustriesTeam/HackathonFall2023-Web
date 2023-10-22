import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { login as apiLogin } from "../api/user";
import useInput from "../features/useInput";
import {
  cont,
  form,
  h1,
  h2,
  input,
  loginInput,
  loginSocial,
  logo,
  page,
  regInput,
} from "../styles/login";
import Container from "../components/Container";
import Input from "../components/Input";
import { css } from "@emotion/react";

const socPanel = css`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top:1rem;
`;

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
        <div>
          <h1 css={logo} onClick={
            ()=>{
              navigate('/')
          }}>статейник</h1>
        </div>
        <div>
          <h1 css={h1}>Вход</h1>
        </div>
        <Input
          css={[cont, input]}
          placeholder="Введите логин"
          type="text"
          {...login}
        />
        <Input
          css={[cont, input]}
          placeholder="Введите пароль"
          type="password"
          {...password}
        />
        <input css={[loginInput]} type="submit" value="Войти" />
        <div css={[regInput]} onClick={() => navigate("/register")}>
          или зарегестрируйтесь
        </div>
        <div css={socPanel}></div>
          <button
            css={[loginSocial]}
            onClick={() => {
              window.location.href = `${
                import.meta.env.VITE_APP_URL || "http://127.0.0.1:3000"
              }/auth/oauth/vk?redirect=${location.origin + "/oauthRedirect"}`;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 48 48"
            >
              <path
                fill="#1976d2"
                d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
              >
              </path>
              <path
                fill="#fff"
                d="M25.2,33.2c-9,0-14.1-6.1-14.3-16.4h4.5c0.1,7.5,3.5,10.7,6.1,11.3V16.8h4.2v6.5c2.6-0.3,5.3-3.2,6.2-6.5h4.2	c-0.7,4-3.7,7-5.8,8.2c2.1,1,5.5,3.6,6.7,8.2h-4.7c-1-3.1-3.5-5.5-6.8-5.9v5.9H25.2z"
              >
              </path>
            </svg>
          </button>
          <button
            css={[loginSocial]}
            onClick={() => {
              window.location.href = `${
                import.meta.env.VITE_APP_URL || "http://127.0.0.1:3000"
              }/auth/oauth/ya?redirect=${location.origin + "/oauthRedirect"}`;
            }}
          >
            <svg
              width="32"
              height="32"
              fill="none"
              version="1.1"
              id="svg136"
            >
              <g
                id="g414"
                transform="translate(-0.80143355,-6.6685e-4)"
              >
                <path
                  d="m 3.4664331,16.000666 c 0,-7.3649198 5.968746,-13.3349993 13.3350009,-13.3349993 7.363586,0 13.335,5.9700795 13.335,13.3349993 0,7.36492 -5.971414,13.335001 -13.335,13.335001 -7.3662549,0 -13.3350009,-5.970081 -13.3350009,-13.335001 z"
                  fill="#fc3f1d"
                  id="path132"
                />
                <path
                  d="M 18.508314,10.221277 H 17.27616 c -2.258949,0 -3.447097,1.144144 -3.447097,2.831021 0,1.906905 0.821436,2.80035 2.508312,3.945826 l 1.393508,0.938784 -4.0045,5.983415 h -2.992374 l 3.593783,-5.35267 c -2.066926,-1.481518 -3.227071,-2.920363 -3.227071,-5.354001 0,-3.051049 2.126933,-5.1339753 6.160771,-5.1339753 h 4.0045 V 23.905654 h -2.757678 z"
                  fill="#ffffff"
                  id="path134"
                />
              </g>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
