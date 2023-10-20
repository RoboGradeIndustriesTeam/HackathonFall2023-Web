import React from "react";
import { useNavigate, useParams } from "react-router";
import { getNote } from "../api/notes";
import { css } from "@emotion/react";

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
color: black;
font-size: 14px;
font-style: italic;
font-weight: 500;
word-wrap: break-word;
margin: 0;
`
const jcSb = css`
display: inline-flex;
justify-content: space-between;
`
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
    opacity: .7;
}
`

const NotePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = React.useState("Загрузка");
  const [body, setBody] = React.useState("Загрузка");
  const [name, setName] = React.useState("Загрузка");
  const [subtitle, setSubTitle] = React.useState("Загрузка");

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
        }
      })();
    }
  }, []);
  return (
    <div css={page}>
      <div css={[cont, jcSb]}>
        <p css={logo}>статейник</p>
        <div css={btn}>вход</div>
      </div>
      <div css={cont}>
        <div>
          <h1 css={articleName}>{name}</h1>
          <h2 css={articleSubtitle}>{subtitle}</h2>
        </div>
        <div css=></div>
      </div>
      <div css={cont}>
        <p css={authorCss}>{author} | время</p>
      </div>
      <div css={cont}>
        <div dangerouslySetInnerHTML={{__html: body}}></div>
      </div>
    </div>
  );
};

export default NotePage;
