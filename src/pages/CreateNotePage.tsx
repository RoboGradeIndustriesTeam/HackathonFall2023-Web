import React from "react";
import useInput from "../features/useInput";
import ReactQuill, { Quill } from "react-quill";
import { createAnonymousNote, createNote } from "../api/notes";
import { useNavigate } from "react-router";
import { useAuth } from "../features/tokenContext";
import { css } from "@emotion/react";
import {
  btn,
  cont,
  contentName,
  jcSb,
  page,
  w100,
  contEdit, 
  editor
} from "../styles/globals";
import MainHeader from "../components/header";

const authorCss = css`
font-size: 14px;
margin: 0;
background-color: #ffffff00;
border: 0;
display: block;
width: 100%;
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
        <MainHeader />
        <div css={[cont, jcSb]}>
          <div css={[contentName, w100]}>
            <input
              placeholder="Заголовок"
              type="text"
              css={articleName}
              {...name}
            />
            <input
              placeholder="Подзаголовок"
              type="text"
              css={articleSubtitle}
              {...subname}
            />
          </div>
          <div>
            <div
              css={btn}
              onClick={async () => {
                if (auth.is_authenticated) {
                  const note = await createNote({
                    name: name.value,
                    subtitle: subname.value,
                    body: val,
                  }, auth.access_token || "");

                  if (!("message" in note)) {
                    navigate(`/${note.slug}`);
                  }
                } else {
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
              }}
            >
              опубликовать
            </div>
          </div>
        </div>
        <div css={[cont, jcSb]}>
          {auth.is_authenticated
            ? (
              <>
                <input
                  readOnly
                  css={authorCss}
                  placeholder="Автор"
                  type="text"
                  value={auth.user?.username || "аноним"}
                />
              </>
            )
            : (
              <input
                css={authorCss}
                placeholder="Автор"
                type="text"
                {...authorName}
              />
            )}
          <div css={btn}>тема</div>
        </div>

        <div css={[cont, contEdit]}>
          <ReactQuill
            css={editor}
            value={val}
            modules={{
              toolbar: {
                handlers: {},
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
