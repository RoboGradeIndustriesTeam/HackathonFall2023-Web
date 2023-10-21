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
  btn,
  cont,
  contentName,
  contLinkdBottom,
  contLinkdTop,
  contModal,
  dialogStyle,
  jcSb,
  page,
} from "../styles/globals";
import NavigationBar from "../components/Navigation";
import { ThemeContext, THEMES } from "../features/theming";
import Container from "../components/Container";

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
  const [burnable, setBurnable] = React.useState<boolean>(false);
  const shareDialogRef = React.useRef<HTMLDialogElement>(null);
  const curTheme = React.useContext(ThemeContext);

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
          setBurnable(note.burnable)
          curTheme.setTheme((THEMES[note.theme] || THEMES.default_).theme);
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
      <dialog ref={shareDialogRef} css={dialogStyle}>
        <Container css={[cont, contModal]}>
          <h1 css={articleName}>ссылка на статью</h1>
          <h2 css={articleSubtitle}>можете поделиться ей</h2>
        </Container>
        
        <Container css={[cont, contModal, contLinkdTop]}>
          <input
            css={linkI}
            placeholder={""}
            value={location.toString()}
            readOnly
          />
        </Container>
        <Container css={[cont, contModal, contLinkdBottom]}>
          <div
            css={btn}
            onClick={() => {
              navigator.clipboard.writeText(location.href.toString());
            }}
          >
            скопировать
          </div>
        </Container>
        <Container css={[cont, contModal, contLinkdTop]}>
          <h1 css={h5}>qr-код на статью</h1>
          <QRCode css={qrCode} value={location.href.toString()}></QRCode>
        </Container>
        <Container css={[cont, contModal, contLinkdBottom]}>
          <div
            css={btn}
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
          >
            скачать
          </div>
        </Container>
        <Container css={[cont, contModal]}>
          <div css={btn} onClick={() => setShareDialog(false)}>закрыть</div>
        </Container>
      </dialog>

      <NavigationBar></NavigationBar>
      <Container css={[cont, jcSb]}>
        <div css={contentName}>
          <h1 css={articleName}>{name}</h1>
          <h2 css={articleSubtitle}>{subtitle}</h2>
        </div>
        <div>
          <div css={btn} onClick={() => setShareDialog(true)}>поделиться</div>
        </div>
      </Container>
      {burnable && <Container>
          <p style={{color: "red"}}>Вы читаете одноразовую статью, она удалена, обновление страницы приведёт к исчезновению статьи.</p>
        </Container>}
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
            {author}
          </a>&nbsp;|&nbsp;{moment(new Date(createdAt))
            .fromNow()}&nbsp;|&nbsp;{views} просмотров
        </p>
        {(auth.is_authenticated && auth.user?.username ||
          "" === author_?.username) && (
          <div
            css={btn}
            onClick={() => navigate(`/edit/${slug}`)}
          >
            редактировать
          </div>
        )}
      </Container>
      <Container css={cont}>
        {/* TODO: Add HTML Santizer */}
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </Container>
    </div>
  );
};

export default NotePage;
