import React from "react";
import useInput from "../features/useInput";
import ReactQuill, { Quill } from "react-quill";
import {
  createAnonymousNote,
  createNote,
  getNote,
  updateNote,
} from "../api/notes";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../features/tokenContext";
import { NoteDto } from "../api/types";
import { css } from "@emotion/react"

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
const contEdit = css`
max-width: 1035px;
padding: 0;
`
const editor = css`
border-radius: 5px;
`

const UpdateNotePage: React.FC = () => {
  const { slug } = useParams();
  const [note, setNote] = React.useState<NoteDto | null>(null);
  const auth = useAuth();
  const [val, setVal] = React.useState<string>("");
  const quillRef = React.useRef<ReactQuill>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      if (!slug) navigate("/");
      else {
        const n = await getNote(slug);
        if (!n || ("message" in n)) navigate("/");
        else {
          setNote(n);
          setVal(n.body);
        }
      }
    })();
  }, []);

  return (
    <>
      <div css={page}>
        <div css={[cont, jcSb, contLinkdBottom]}>
          <p css={logo} onClick={() => navigate("/create")}>статейник</p>
          {/* {auth.is_authenticated
            ? (
              <div css={btn} onClick={() => navigate("/profile")}>
                {user?.username || ""}
              </div>
            )
            : <div css={btn} onClick={() => navigate("/login")}>вход</div>} */}
        </div>
        <div css={[cont, jcSb]}>
        <div css={[contentName, w100]}>
            <h1 css={articleName}>редактировании статьи {slug}</h1>
          </div>
          <div>
            <div css={btn} onClick={() => navigate(-1)}>вернуться назад</div>
          </div>
        </div>

        <div css={[cont, jcSb]}>
          <div css={[contentName, w100]}>
            <h2 css={articleName}>{note?.title}</h2>
            <h3 css={articleSubtitle}>{note?.subtitle}</h3>
          </div>
          <div>
            <div css={btn} onClick={async () => {
          if (!note) return;
          const r = await updateNote(val, auth.access_token || "", slug || "")
          if ("message" in r) {
            alert(r.message)
          }
          else {
            navigate(`/${slug}`)
          }
        }}>сохранить</div>
          </div>
        </div>
      
        <div css={[cont, cont]}>
          <ReactQuill
            css={editor}
            value={val}
            modules={{
              toolbar: {
                // handlers: {
                //   image: imageHandler,
                // },
              },
            }}
            ref={quillRef}
            onChange={(e) => setVal(e)}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateNotePage;
