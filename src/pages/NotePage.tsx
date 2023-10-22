import React from "react";
import { useNavigate, useParams } from "react-router";
import { getNote } from "../api/notes";
import { css } from "@emotion/react";
import moment from "moment";
import { QRCode } from "react-qrcode";
import { create, toDataURL } from "qrcode";
import { UserDto } from "../api/types";
import { useAuth } from "../features/tokenContext";
moment.locale("ru");
import {
  articleName,
  articleSubtitle,
  authorCss,
  brT0,
  btn,
  cont,
  contentName,
  contLinkdBottom,
  contLinkdTop,
  contModal,
  dialogStyle,
  jcSb,
  mb0,
  ml0,
  page,
} from "../styles/globals";
import NavigationBar from "../components/Navigation";
import { ThemeContext, THEMES } from "../features/theming";
import Container from "../components/Container";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import createImagePlugin from "@draft-js-plugins/image";

const h5 = css`
font-size: 16px;
font-weight: 800;
margin-bottom: 15px;
`;
const qrCode = css`
border-radius: 5px;
`;
const linkI = css`
color: #007FF3;
font-size: 12px;
font-weight: 400;
text-decoration: underline;
border: 0;
background: 0;
width: 100%;
&:focus-visible {
  outline: 0;
}
`;

const hr = css`
margin: 0;
`;

const NotePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = React.useState("Загрузка");
  const [author_, setAuthor_] = React.useState<UserDto | null>(null);
  const [body, setBody] = React.useState("Загрузка");
  const [name, setName] = React.useState("Загрузка");
  const [subtitle, setSubTitle] = React.useState("Загрузка");
  const [createdAt, setCreatedAt] = React.useState(Date.now());
  const [views, setViews] = React.useState<number>(0);
  const [shareDialog, setShareDialog] = React.useState<boolean>(false);
  const [burnable, setBurnable] = React.useState<number>(-1);
  const shareDialogRef = React.useRef<HTMLDialogElement>(null);
  const curTheme = React.useContext(ThemeContext);
  const [state, setState] = React.useState(EditorState.createEmpty());
  const imagePlugin = createImagePlugin();
  const auth = useAuth();
  React.useEffect(() => {
    if (!slug) navigate("/");
    else {
      (async () => {
        const note = await getNote(slug);
        if ("message" in note) {
          navigate("/error");
        } else {
          setAuthor(note.authorName);
          setBody(note.body);
          setName(note.title);
          setSubTitle(note.subtitle);
          setCreatedAt(note.createdAt);
          setAuthor_(note.author);
          setViews(note.views);
          setBurnable(note.burnable);

          console.log(note.theme);

          curTheme.setTheme((THEMES[note.theme] || THEMES.default_).theme);

          setState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(note.body)),
            ),
          );
        }
      })();
    }
    return () => curTheme.setTheme(THEMES.default.theme);
  }, []);
  React.useEffect(() => {
    if (shareDialog) {
      shareDialogRef.current?.showModal();
    } else {
      shareDialogRef.current?.close();
    }
  }, [shareDialog]);

  return (
    <div css={[page]}>
      <dialog
        ref={shareDialogRef}
        css={dialogStyle}
        onClose={() => setShareDialog(false)}
      >
        <Container css={[cont, contModal, contLinkdTop]}>
          <h1 css={articleName} style={{ color: curTheme.theme.text }}>
            Ссылка на статью
          </h1>
        </Container>

        <Container css={[cont, contModal, mb0]}>
          <input
            css={linkI}
            placeholder={""}
            value={location.toString()}
            readOnly
          />

          <div
            css={[btn, ml0]}
            style={{ color: curTheme.theme.text }}
            onClick={() => {
              setTimeout(() => {
                try {
                  navigator.clipboard.writeText(location.href.toString());
                } catch (E) {
                  alert("Не удалось скопировать.");
                }
              }, 100);
            }}
          >
            Скопировать ссылку
          </div>
        </Container>
        <hr css={hr} />
        <Container css={[cont, contModal, mb0]}>
          <h1 css={h5} style={{ color: curTheme.theme.text }}>
            QR-код на статью
          </h1>
          <QRCode css={qrCode} value={location.href.toString()}></QRCode>
          <div
            css={[btn, ml0]}
            onClick={async () => {
              let pom = document.createElement("a");
              pom.setAttribute(
                "href",
                await toDataURL(location.href.toString()),
              );
              pom.setAttribute("download", slug + "-qr.png");
              pom.style.display = "none";
              document.body.appendChild(pom);
              pom.click();
              document.body.removeChild(pom);
            }}
            style={{ color: curTheme.theme.text }}
          >
            Скачать QR-код
          </div>
        </Container>
        <hr css={hr} />
        <Container css={[cont, contModal, brT0]}>
          <div
            css={[btn, ml0]}
            onClick={() => setShareDialog(false)}
            style={{ color: curTheme.theme.text }}
          >
            Закрыть
          </div>
        </Container>
      </dialog>

      <NavigationBar></NavigationBar>
      <Container css={[cont, jcSb]}>
        <div css={contentName}>
          <h1 css={articleName}>{name}</h1>
          <h2 css={articleSubtitle}>{subtitle}</h2>
        </div>
        <div>
          <div
            css={btn}
            onClick={() => setShareDialog(true)}
            style={{ color: curTheme.theme.text }}
          >
            Поделиться
          </div>
        </div>
      </Container>
      {burnable !== -1 && (
        <Container>
          <p style={{ color: "red" }}>
            Вы читаете не бесконечную статью, после истечения количества
            просмотров статья будет удалена
          </p>
        </Container>
      )}
      <Container css={[cont, jcSb]}>
        <p css={authorCss}>
          <a
            href={author_ ? `#` : undefined}
            onClick={author_
              ? (e) => {
                e.preventDefault();
                navigate(`/profile/${author_.username}`);
              }
              : (e) => {
                e.preventDefault();
              }}
          >
            {author_?.displayName || author}
          </a>&nbsp;|&nbsp;{moment(new Date(createdAt))
            .fromNow()}&nbsp;|&nbsp;{views} просмотров
        </p>
        {
          /* {(auth.is_authenticated && auth.user?.username ||
          "" === author_?.username) && (
          <div
            css={btn}
            onClick={() => navigate(`/edit/${slug}`)}
          >
            редактировать
          </div>
        )} */
        }
      </Container>
      <Container css={cont}>
        {/* TODO: Add HTML Santizer */}
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
        {
          /* <Editor
          // plugins={[imagePlugin]}
          onChange={() => {}}
          editorState={state}
          readOnly={true}
        /> */
        }
      </Container>
    </div>
  );
};

export default NotePage;
