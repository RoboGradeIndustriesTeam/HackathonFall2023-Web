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
import { css } from "@emotion/react";
import { useAuth } from "../features/tokenContext";
import { NoteDto } from "../api/types";
import {
  articleName,
  articleSubtitle,
  btn,
  cont,
  jcSb,
  page,
  w100,
  contEdit,
  editor
} from "../styles/globals";
import MainHeader from "../components/header";

const contentName = css`
max-width: calc(100% - 110px);
`;

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
        <MainHeader></MainHeader>
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
            <div
              css={btn}
              onClick={async () => {
                if (!note) return;
                const r = await updateNote(
                  val,
                  auth.access_token || "",
                  slug || "",
                );
                if ("message" in r) {
                  alert(r.message);
                } else {
                  navigate(`/${slug}`);
                }
              }}
            >
              сохранить
            </div>
          </div>
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

export default UpdateNotePage;
