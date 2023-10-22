import React, {} from "react";
import { useAuth } from "../features/tokenContext";
import { useNavigate, useParams } from "react-router";
import { NoteDto, UserDto } from "../api/types";
import { getUserNotes } from "../api/notes";
import { getUserByName } from "../api/user";
import {
  articleName,
  articleSubtitle,
  authorCss,
  btn,
  btnCont,
  cont,
  jcSb,
  page,
  w100,
} from "../styles/globals";
import { css } from "@emotion/react";
import NavigationBar from "../components/Navigation";
import moment from "moment";
import Container from "../components/Container";

const contentName = css`
max-width: calc(100% - 135px);
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
          setUsername(usr.username);
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
      <NavigationBar />
      <Container css={[cont, jcSb]}>
        <div css={[contentName, w100]}>
          <h1 css={articleName}>{user?.displayName}</h1>
          <h2 css={articleSubtitle}>Статьи автора</h2>
        </div>
        <div>
          <div css={btn} onClick={() => navigate(-1)}>Назад</div>
        </div>
      </Container>
      {notes.map((i) => (
        <Container onClick={() => navigate(`/${i.slug}`)} css={[cont, btnCont]}>
          <p css={authorCss}>
            {i.title} | {i.views} Просмотров | {moment(i.createdAt).fromNow()}
          </p>
        </Container>
      ))}
    </div>
  );
};

export default ProfilePage;
