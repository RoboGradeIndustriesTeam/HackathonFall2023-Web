import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TokenContenxt } from "./features/tokenContext";
import { ApiError, UserDto } from "./api/types";
import { getUser } from "./api/user";
import LoginPage from "./pages/LoginPage";
import NotePage from "./pages/NotePage";
import ErrorPage from "./pages/ErrorPage";
import CreateNotePage from "./pages/CreateNotePage";
import "./style.css";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateNotePage from "./pages/UpdateNote";
import { ITheme, ThemeContext, THEMES } from "./features/theming";
import OauthRedirectPage from "./pages/OauthRedirectPage";

// TODO: Lazy Loading
const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateNotePage></CreateNotePage>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/profile",
    element: <ProfilePage></ProfilePage>,
  },
  {
    path: "/profile/:username",
    element: <ProfilePage></ProfilePage>,
  },
  {
    path: "/create",
    element: <CreateNotePage></CreateNotePage>,
  },
  {
    path: "/edit/:slug",
    element: <UpdateNotePage></UpdateNotePage>,
  },

  {
    path: "/error",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/:slug",
    element: <NotePage></NotePage>,
  },
  {
    path: "/oauthRedirect",
    element: <OauthRedirectPage/>
  }
]);
const App: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [isAuthenticaed, setIsAuthenticaed] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserDto | null>(null);

  const [theme, setTheme] = React.useState<ITheme>(THEMES.default.theme);
  const windowRef = React.useRef<Window>(window);

  async function setAccessToken_(access_token: string) {
    const user = await getUser(access_token);
    if (user && !("message" in user)) {
      setAccessToken(access_token);
      setIsAuthenticaed(true);
      setUser(user);
      console.log(
        `Successfully authenticated as ${user.username} (${user._id})`,
      );
      localStorage.setItem("access_token", access_token);
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
  React.useEffect(() => {
    if (windowRef.current) {
      windowRef.current.document.body.style.background = theme.background;
      windowRef.current.document.body.style.color = theme.text;
    }
  }, [theme])
  return (
    <TokenContenxt.Provider
      value={{
        access_token: accessToken,
        is_authenticated: isAuthenticaed,
        user: user,
        setAccessToken: setAccessToken_,
      }}
    >
      <ThemeContext.Provider value={{
        theme,
        setTheme(theme) {
          setTheme(theme)
        },
      }}>
      <RouterProvider router={router} />

      </ThemeContext.Provider>
    </TokenContenxt.Provider>
  );
};

export default App;
