import React from "react";
import useInput from "../features/useInput";
import ReactQuill, { Quill } from "react-quill";
import { createAnonymousNote, createNote } from "../api/notes";
import { useNavigate } from "react-router";
import { useAuth } from "../features/tokenContext";
import { css } from "@emotion/react";

const authorCss = css`
font-size: 14px;
margin: 0;
background-color: #ffffff00;
border: 0;
display: block;
width: 100%;
`;

const w100 = css`
width: 100%;
`

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
word-wrap: break-word;
background-color: #ffffff00;
border: 0;
display: block;
width: 100%;
`;
const articleSubtitle = css`
font-size: 14px;
font-weight: 400;
word-wrap: break-word;
margin: 0;
background-color: #ffffff00;
border: 0;
display: block;
width: 100%;
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

const dialogStyle = css`
&::backdrop {
  // background-image: linear-gradient(
  //   45deg,
  //   magenta,
  //   rebeccapurple,
  //   dodgerblue,
  //   green
  // );
  background: rgba(0, 0, 0, 0.4);  opacity: 1;
}
border: none;
border-radius: 10px;
  
`;
const contentName = css`
max-width: calc(100% - 90px);
`;
const contEdit = css`
max-width: 1035px;
padding: 0;
`
const editor = css`
border-radius: 5px;
`
const contLinkdBottom = css`
border-radius: 0;
border-bottom-left-radius: 5px; 
border-bottom-right-radius: 5px; 
`;

const CreateNotePage: React.FC = () => {
  const name = useInput("");
  const subname = useInput("");
  const authorName = useInput("");
  const auth = useAuth();
  const [val, setVal] = React.useState<string>("");
  const quillRef = React.useRef<ReactQuill>(null);

  const navigate = useNavigate();

  return (
    <>
      <div css={page}>
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
          <div css={[contentName, w100]}>
            <input placeholder="Заголовок" type="text" css={articleName} {...name} />
            <input placeholder="Подзаголовок" type="text" css={articleSubtitle} {...subname} />
          </div>
          <div>
            <div css={btn} onClick={async () => {
            if (auth.is_authenticated) {
              const note = await createNote({
                name: name.value,
                subtitle: subname.value,
                body: val
              }, auth.access_token || "");
  
              if (!("message" in note)) {
                navigate(`/${note.slug}`);
              }
            }
            else {
              const note = await createAnonymousNote({
                name: name.value,
                subtitle: subname.value,
                body: val,
                authorName: authorName.value,
              });
  
              if (!("message" in note)) {
                navigate(`/${note.slug}`);
              }
            }
          }}>опубликовать</div>
          </div>
        </div>
        <div css={[cont, jcSb]}>
          {auth.is_authenticated ? <>
            <input readOnly css={authorCss} placeholder="Автор" type="text" value={auth.user?.username || "аноним"} />
          </> : <input css={authorCss} placeholder="Автор" type="text" {...authorName} />}
            <div css={btn}>тема</div>
        </div>
        
        <div css={[cont, contEdit]}>
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

export default CreateNotePage;
