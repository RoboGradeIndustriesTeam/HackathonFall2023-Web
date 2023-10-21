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
  contEdit,
  contentName,
  contModal,
  dialogStyle,
  editor,
  jcSb,
  page,
  w100,
} from "../styles/globals";
import NavigationBar from "../components/Navigation";
import { ThemeContext, THEMES } from "../features/theming";
import Container from "../components/Container";
import Input from "../components/Input";

const sel = css`
background: #00000000;
border-radius: 5px;
border: none;
`;

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
  const auth = useAuth();

  const name = useInput("");
  const subname = useInput("");
  const authorName = useInput("");
  const [burnable, setBurnable] = React.useState<boolean>(false);
  const [anonymous, setAnonymous] = React.useState<boolean>(
    !auth.is_authenticated,
  );
  const [val, setVal] = React.useState<string>("");
  const quillRef = React.useRef<ReactQuill>(null);

  const navigate = useNavigate();
  const [themeDialog, setThemeDialog] = React.useState<boolean>(false);
  const themeDialogRef = React.useRef<HTMLDialogElement>(null);
  const [theme, setTheme] = React.useState<string>("default");
  const themeC = React.useContext(ThemeContext);
  React.useEffect(() => {
    if (themeDialog) {
      themeDialogRef.current?.showModal();
    } else {
      themeDialogRef.current?.close();
    }
  }, [themeDialog]);
  React.useEffect(() => {
    themeC.setTheme(THEMES[theme].theme);
  }, [theme]);
  React.useEffect(() => {
    return () => {
      themeC.setTheme(THEMES.default.theme);
    };
  }, []);
  return (
    <>
      <div css={page}>
        <NavigationBar />
        <Container css={[cont, jcSb]}>
          <div css={[contentName, w100]}>
            <Input
              placeholder="Заголовок"
              type="text"
              css={articleName}
              {...name}
            />
            <Input
              placeholder="Подзаголовок"
              type="text"
              css={articleSubtitle}
              {...subname}
            />
          </div>
          <div>
            <div
              css={btn}
              style={{ color: themeC.theme.input }}
              onClick={async () => {
                if (!anonymous) {
                  const note = await createNote({
                    name: name.value,
                    subtitle: subname.value,
                    body: val,
                    theme: theme,
                  }, auth.access_token || "");

                  if (!("message" in note)) {
                    navigate(`/${note.slug}`);
                  }
                } else {
                  const note = await createAnonymousNote({
                    name: name.value,
                    subtitle: subname.value,
                    body: val,
                    authorName: authorName.value || "аноним",
                    burnable: burnable,
                    theme: theme,
                  });

                  if (!("message" in note)) {
                    if (!burnable) navigate(`/${note.slug}`);
                    else {
                      alert(
                        "Вы создали одноразовую статью, ссылка скопирована в буфер обмена",
                      );
                      navigator.clipboard.writeText(
                        (new URL(location.origin + `/${note.slug}`)).toString(),
                      );
                    }
                  }
                }
              }}
            >
              опубликовать
            </div>
          </div>
        </Container>
        <Container css={[cont, jcSb]}>
          {!anonymous
            ? (
              <>
                <Input
                  readOnly
                  css={authorCss}
                  placeholder="Автор"
                  type="text"
                  value={auth.user?.username || "аноним"}
                />
              </>
            )
            : (
              <Input
                css={authorCss}
                placeholder="Автор"
                type="text"
                {...authorName}
              />
            )}
          <select
            css={sel}
            onChange={(e) => setTheme(e.target.value)}
            style={{ color: themeC.theme.input }}
          >
            {Object.entries(THEMES).map(([k, v]) => (
              <option value={`${k}`} key={`option-${k}`}>{v.name}</option>
            ))}
          </select>
        </Container>

        <Container css={[cont]}>
          {auth.is_authenticated && (
            <div>
              <input
                type="checkbox"
                id={"anonymousCheck"}
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              <label htmlFor={"anonymousCheck"}>Анонимная</label>
            </div>
          )}
          <div>
            <input
              type="checkbox"
              checked={anonymous ? burnable : false}
              id={"burnableCheck"}
              disabled={!anonymous}
              onChange={(e) => setBurnable(e.target.checked)}
            />
            <label htmlFor={"burnableCheck"}>Одноразовая</label>
            <p>
              Одноразовая статья может быть прочтена только один раз, а так же
              не может иметь автора.
            </p>
          </div>
        </Container>

        <Container css={[cont, contEdit]}>
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
        </Container>
      </div>
    </>
  );
};

export default CreateNotePage;
