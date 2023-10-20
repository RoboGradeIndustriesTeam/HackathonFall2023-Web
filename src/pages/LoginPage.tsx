import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { login as apiLogin } from "../api/user";
import useInput from "../features/useInput";

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
        password: password.value
    });
    if ("message" in resp) {
        // handle error
    }
    else {
        await auth.setAccessToken(resp.access_token);
        if (auth.is_authenticated) {
            navigate("/")
        }
        else {
            // handle error
        }
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" {...login} />
        <input type="text" {...password} />
        <input type="submit" value="Войти" />
      </form>
    </>
  );
};

export default LoginPage