import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate, useParams } from "react-router";
import { NoteDto, UserDto } from "../api/types";
import { getUserNotes } from "../api/notes";
import { css } from "@emotion/react";
import { getUserByName } from "../api/user";

const authorCss = css`
font-size: 14px;
margin: 0;
`;
const cont = css`
border-radius: 5px; 
background-color: #D9D9D9;
padding: 14px 18px;
width: 100%;
max-width: 1000px;
margin-bottom: 15px;
`;

const page = css`
max-width: 100%;
display: flex;
flex-direction: column;
align-items: center;
font-family: Inter;
`;

const articleName = css`
font-size: 24px;
font-weight: 600;
margin: 0;
word-wrap: break-word
`;
const articleSubtitle = css`
font-size: 14px;
font-weight: 400;
word-wrap: break-word;
margin: 0;
`;
const logo = css`
cursor: pointer;
color: black;
font-size: 14px;
font-style: italic;
font-weight: 500;
word-wrap: break-word;
margin: 0;
transition: .3s;
opacity: 1;
&:hover {
  opacity: .7;
  color: #EE1D00;
}
`;
const jcSb = css`
display: inline-flex;
justify-content: space-between;
align-items: center;
`;
const btn = css`
color: black;
font-size: 12px;
font-weight: 400;
text-decoration: underline;
word-wrap: break-word;
cursor: pointer;
transition: opacity .3s;
opacity: 1;
&:hover {
    opacity: .6;
}
`;
const contentName = css`
max-width: calc(100% - 110px);
`;
const w100 = css`
width: 100%;
`;
const contLinkdBottom = css`
border-radius: 0;
border-bottom-left-radius: 5px; 
border-bottom-right-radius: 5px; 
`;

const ProfilePage: React.FC = () => {
  const pars = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = React.useState<UserDto | null>(null);
  const [username, setUsername] = React.useState<string>("Загрузка");
  const [notes, setNotes] = React.useState<Array<NoteDto>>([]);
  React.useEffect(() => {
    (async () => {
      if (pars.username) {
        const usr = await getUserByName(pars.username);
        if ("message" in usr) {
          navigate("/");
        } else {
          setUser(usr);
          setUsername(usr.username)
          const r = await getUserNotes(usr.username);
          if ("message" in r) {
            console.log(r);
          } else {
            setNotes(r);
          }
        }
      } else {
        if (auth.is_authenticated && auth.user) {
          setUsername(auth.user.username);
          setUser(auth.user);
          const r = await getUserNotes(auth.user.username);
          if ("message" in r) {
            console.log(r);
          } else {
            setNotes(r);
          }
        }
      }
    })();
  }, [auth.is_authenticated]);

  return (
    <div css={page}>
      <div css={[cont, jcSb, contLinkdBottom]}>
        <p css={logo} onClick={() => navigate("/create")}>статейник</p>
        {auth.is_authenticated
          ? (
            <div css={btn} onClick={() => navigate("/profile")}>
              {user?.username || ""}
            </div>
          )
          : <div css={btn} onClick={() => navigate("/login")}>вход</div>}
      </div>
      <div css={[cont, jcSb]}>
        <div css={[contentName, w100]}>
          <h1 css={articleName}>{username}</h1>
          <h2 css={articleSubtitle}>статьи автора</h2>
        </div>
        <div>
          <div css={btn} onClick={() => navigate(-1)}>вернуться назад</div>
        </div>
      </div>
      {notes.map((i) => (
        <div onClick={() => navigate(`/${i.slug}`)} css={[cont, btn]}>
          <p css={authorCss}>{i.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
