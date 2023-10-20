import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TokenContenxt } from "./features/tokenContext";
import { ApiError, UserDto } from "./api/types";
import { getUser } from "./api/user";
import LoginPage from "./pages/LoginPage";
import NotePage from "./pages/NotePage";
import ErrorPage from "./pages/ErrorPage";
import CreateNotePage from "./pages/CreateNotePage";
import Playground from "./pages/Playground";
import "./style.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Example Note</div>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/create",
    element: <CreateNotePage></CreateNotePage>
  },
  {
    path: "/playground",
    element: <Playground></Playground>
  },
  {
    path: "/error",
    element: <ErrorPage></ErrorPage>
  },
  {
    path: "/:slug",
    element: <NotePage></NotePage>
  }
]);
const App: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [isAuthenticaed, setIsAuthenticaed] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserDto | null>(null);
  async function setAccessToken_(access_token: string ) {
    const user = await getUser(access_token);
    if (user && !("message" in user)) {
      setAccessToken(access_token);
      setIsAuthenticaed(true);
      setUser(user);
      console.log(`Successfully authenticated as ${user.username} (${user._id})`)
      localStorage.setItem("access_token", access_token)
    }
  }
  React.useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      (async () => {
        await setAccessToken_(access_token);
      })();
    }
  }, []);
  return (
    <TokenContenxt.Provider
      value={{
        access_token: accessToken,
        is_authenticated: isAuthenticaed,
        user: user,
        setAccessToken: setAccessToken_
      }}
    >
      <RouterProvider router={router} />
    </TokenContenxt.Provider>
  );
};

export default App;
