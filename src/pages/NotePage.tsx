import React from "react";
import { useNavigate, useParams } from "react-router";
import { getNote } from "../api/notes";
import { css } from "@emotion/react";
import * as dayjs from "dayjs";
import * as rel from "dayjs/plugin/relativeTime"; // import plugin
import "dayjs/locale/ru";
import { QRCode } from "react-qrcode";
import { UserDto } from "../api/types";
import { useAuth } from "../features/tokenContext";
dayjs.locale("ru");
dayjs.extend(rel);

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

const contModal = css`
width: 100%;
max-width: 415px;
`;
const dialogStyle = css`
&::backdrop {
  background: rgba(0, 0, 0, 0.25); 
  backdrop-filter: blur(4px);
}
&:focus-visible {
  outline: 0;
}
border: none;
background: 0;
width: 100%;
max-width: 451px;
`;
const contentName = css`
max-width: calc(100% - 90px);
`;
const contLinkdTop = css`
border-radius: 0;
border-top-left-radius: 5px; 
border-top-right-radius: 5px; 
border-bottom: 1px #939393 solid; 
margin-bottom: 0;
`;
const contLinkdBottom = css`
border-radius: 0;
border-bottom-left-radius: 5px; 
border-bottom-right-radius: 5px; 
`;

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
  const [shareDialog, setShareDialog] = React.useState<boolean>(false);
  const [views, setViews] = React.useState<number>(0)
  const dialogRef = React.useRef<HTMLDialogElement>(null);
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
          setViews(note.views)
        }
      })();
    }
  }, []);
  React.useEffect(() => {
    if (shareDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [shareDialog]);
  return (
    <div css={[page]}>
      <dialog ref={dialogRef} css={dialogStyle}>
        <div css={[cont, contModal]}>
          <h1 css={articleName}>ссылка на статью</h1>
          <h2 css={articleSubtitle}>можете поделиться ей</h2>
        </div>
        <div css={[cont, contModal, contLinkdTop]}>
          <input css={linkI} placeholder={""} value={location.toString()} readOnly />
        </div>
        <div css={[cont, contModal, contLinkdBottom]}>
          <div css={btn}>скопировать</div>
        </div>
        <div css={[cont, contModal, contLinkdTop]}>
          <h1 css={h5}>qr-код на статью</h1>
          <QRCode css={qrCode} value={location.href.toString()}></QRCode>
        </div>
        <div css={[cont, contModal, contLinkdBottom]}>
          <div css={btn}>скачать</div>
        </div>
        <div css={[cont, contModal]}>
          <div css={btn} onClick={() => setShareDialog(false)}>закрыть</div>
        </div>
      </dialog>
      <div css={[cont, jcSb, contLinkdBottom]}>
        <p css={logo} onClick={() => navigate("/create")}>статейник</p>
        {auth.is_authenticated
          ? (
            <div css={btn} onClick={() => navigate("/profile")}>
              {auth.user?.username || ""}
            </div>
          )
          : <div css={btn} onClick={() => navigate("/login")}>вход</div>}
      </div>
      <div css={[cont, jcSb]}>
        <div css={contentName}>
          <h1 css={articleName}>{name}</h1>
          <h2 css={articleSubtitle}>{subtitle}</h2>
        </div>
        <div>
          <div css={btn} onClick={() => setShareDialog(true)}>поделиться</div>
        </div>
      </div>
      <div css={[cont, jcSb]}>
        <p css={authorCss}>
          <a
            href={author_ ? `#` : undefined}
            onClick={author_
              ? (e) => {e.preventDefault();navigate(`/profile/${author_.username}`)}
              : (e) => {e.preventDefault()}}
          >
            {author}
          </a>&nbsp;|&nbsp;{dayjs(new Date(createdAt)).fromNow()}&nbsp;|&nbsp;{views} просмотров
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
      </div>
      <div css={cont}>
        {/* TODO: Add HTML Santizer */}
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </div>
  );
};

export default NotePage;
