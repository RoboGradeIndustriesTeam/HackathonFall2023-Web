import React from "react";
import useInput from "../features/useInput";
import ReactQuill, { Quill } from "react-quill";
import { createAnonymousNote, createNote } from "../api/notes";
import { useNavigate } from "react-router";
import { useAuth } from "../features/tokenContext";
import { css } from "@emotion/react";
import draftToHtml from "draftjs-to-html";
import { stateToHTML } from "draft-js-export-html";

import Immutable from "immutable";
import {
  btn,
  check,
  checkLabel,
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
import Editor from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import htmltodraft from "html-to-draftjs";
import {
  BlockMapBuilder,
  CharacterMetadata,
  ContentBlock,
  convertFromRaw,
  convertToRaw,
  Entity,
  genKey,
} from "draft-js";
import {
  AtomicBlockUtils,
  ContentState,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
} from "draft-js";
import axios from "axios";
import PluginEditor from "@draft-js-plugins/editor/lib/Editor";

const sel = css`
background: #00000000;
border-radius: 5px;
border: none;
font-size: 16px;
`;

const authorCss = css`
font-size: 16px;
margin: 0;
background-color: #ffffff00;
border: 0;
display: block;
width: fit-content;
padding: 4px 6px;
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
width: fit-content;
padding: 4px 6px;
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
width: fit-content;
padding: 4px 6px;
width: 100%;
`;

const publish = css`
text-decoration: 0;
display: flex;
align-items: center;
`;

const checkCont = css`
display: flex;
justifi-content: center;
margin-bottom: 15px;
&:last-child {
  margin-bottom: 0;
}
`;

const menuEdit = css`
width: 35px;
height: 35px;
border-radius: 7px;
background: #D9D9D9;
cursor: pointer;
opacity: 1;
transition: opacity .3s;
&:hover {
  opacity: .7;
}
display: flex;
align-items: center;
justify-content: center;
margin-right: 10px;
&:last-child {
  margin-right: 0px;
}
border: 0;
`;
const bold = css`
color: black;
font-size: 24px;
font-weight: 900;
`;
const italic = css`
font-size: 24px;
font-style: italic;
font-weight: 400;
`;

const h12 = css`
font-size: 20px;
font-weight: 400;
`;

const menuEditBtns = css`
display: flex;
margin-bottom: 15px;
`;

const labelEter = css`
`;

const CreateNotePage: React.FC = () => {
  const auth = useAuth();

  const name = useInput("");
  const subname = useInput("");
  const authorName = useInput("");
  const [isForever, setForever] = React.useState<boolean>(true);
  const [burnable, setBurnable] = React.useState<number>(1);
  const [anonymous, setAnonymous] = React.useState<boolean>(
    !auth.is_authenticated,
  );
  const [val, setVal] = React.useState<string>("");
  const quillRef = React.useRef<ReactQuill>(null);
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const imagePlugin = createImagePlugin({});
  async function textHandle(event: any) {
    setText(event.target.value);
    await checkGrammar();
  }
  const checkGrammar = async () => {
    try {
      const response = await axios.get(
        "https://speller.yandex.net/services/spellservice.json/checkText",
        {
          params: {
            text: text,
          },
        },
      );
      setErrors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [language, setLanguage] = React.useState<string>("rus");
  const [text, setText] = React.useState<string>("");
  const [errors, setErrors] = React.useState([]);
  const editorRef = React.useRef<PluginEditor>(null);
  const handleFileSelect = async (file: File) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      if (!e.target) return;
      const fileData = e.target.result;

      // Check if the file is an image

      const formData = new FormData();
      formData.append("file", file);

      try {
        // TODO: extend to api files
        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_URL || "http://127.0.0.1:3000"
          }/files/upload`,
          formData,
        );

        const fileId = response.data._id;
        const fileHash = response.data.hash;

        const fileDownloadUrl = `${
          import.meta.env.VITE_APP_URL || "http://127.0.0.1:3000"
        }/files/${fileHash}`;

        if (file.type.startsWith("image/")) {
          setEditorState(
            imagePlugin.addImage(editorState, fileDownloadUrl, {}),
          );
        } else {
          const selection = editorState.getSelection();
          const contentState = editorState.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity(
            "LINK",
            "MUTABLE",
            { url: "https://google.com" },
          );
          const entityKey = contentStateWithEntity
            .getLastCreatedEntityKey();
          // const newEditorState = EditorState.set(editorState, {
          //   currentContent: contentStateWithEntity,
          // });
          /*

           */
          // const newBlockKey = genKey();
          // let blocks = contentState.getBlockMap();
          // blocks.set(newBlockKey, new ContentBlock({
          //   key: newBlockKey,
          //   type: "unstyled",

          // }))
          // const newBlockMap = blocks;
          // const newContentState = contentState.merge({
          //   blockMap: newBlockMap,
          //   selectionBefore: selection,
          //   selectionAfter: selection,
          // });
          // setEditorState(
          //   EditorState.push(
          //     editorState,
          //     // @ts-ignore
          //     newContentState,
          //     "insert-fragment",
          //   ),
          // );
          // Get the current content state of the editor
          const currentContentState = editorState.getCurrentContent();

          // Create a new ContentBlock
          const newBlockKey = genKey();
          const ent = Entity.create("LINK", "MUTABLE", { url: "test.com" });
          const newBlock = new ContentBlock({
            key: newBlockKey,
            text: file.name + "(файл был загружен, фронтэнд не готов, url файла: '" + fileDownloadUrl + "')",
            type: "unstyled",
           
          });

          // Get the current selection state of the editor
          const currentSelectionState = editorState.getSelection();

          // Get the current block key of the last block in the editor
          const lastBlockKey = currentContentState.getLastBlock().getKey();

          // Create a new ContentState and add the new ContentBlock to the end of the block map
          const newContentState = ContentState.createFromBlockArray(
            currentContentState.getBlockMap().set(newBlockKey, newBlock)
              .toArray(),
          );

          // Update the editor's content state with the new ContentState
          const newEditorState = EditorState.push(
            editorState,
            newContentState,
            "insert-fragment",
          );

          // Set the selection state to the end of the new block
          const newSelectionState = currentSelectionState.merge({
            anchorKey: newBlockKey,
            anchorOffset: newBlock.getLength(),
            focusKey: newBlockKey,
            focusOffset: newBlock.getLength(),
            isBackward: false,
          });

          // Update the editor's selection state with the new SelectionState
          const finalEditorState = EditorState.forceSelection(
            newEditorState,
            newSelectionState,
          );
          setEditorState(finalEditorState);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    reader.readAsDataURL(file);
  };
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
              css={[btn, publish]}
              style={{ color: themeC.theme.input }}
              onClick={async () => {
                if (
                  name.value.trim() === "" ||
                  subname.value.trim() === ""
                ) {
                  return alert("Нельзя создать статью без имени или субтитла.");
                }
                if (!anonymous) {
                  const note = await createNote({
                    name: name.value,
                    subtitle: subname.value,
                    body: stateToHTML(editorState.getCurrentContent()),

                    theme: theme,
                  }, auth.access_token || "");

                  if (!("message" in note)) {
                    navigate(`/${note.slug}`);
                  }
                } else {
                  const note = await createAnonymousNote({
                    name: name.value,
                    subtitle: subname.value,
                    body: stateToHTML(editorState.getCurrentContent()),

                    authorName: authorName.value || "аноним",
                    burnable: burnable,
                    theme: theme,
                  });

                  if (!("message" in note)) {
                    if (burnable === -1) navigate(`/${note.slug}`);
                    else {
                      alert(
                        "Вы создали не бесконечную статью, ссылка скопирована в буфер обмена",
                      );
                      setTimeout(() => {
                        try {
                          var isMac =
                            navigator.platform.toUpperCase().indexOf("MAC") >=
                              0;
                          if (isMac) {
                            alert(
                              "Не удалось скопировать. Нажмите OK чтобы отобразить ссылку",
                            );
                            alert(
                              (new URL(location.origin + `/${note.slug}`))
                                .toString(),
                            );
                            return;
                          }
                          navigator.clipboard.writeText(
                            (new URL(location.origin + `/${note.slug}`))
                              .toString(),
                          );
                        } catch (e) {
                          alert(
                            "Не удалось скопировать. Нажмите OK чтобы отобразить ссылку",
                          );
                          alert(
                            (new URL(location.origin + `/${note.slug}`))
                              .toString(),
                          );
                        }
                      }, 100);
                    }
                  }
                }
              }}
            >
              Опубликовать&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path d="M 26.5 6 C 23.480226 6 21 8.4802259 21 11.5 L 21 21 L 11.5 21 C 8.4802259 21 6 23.480226 6 26.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 26.5 6 z M 26.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 26.5 C 9 25.101774 10.101774 24 11.5 24 L 22.5 24 A 1.50015 1.50015 0 0 0 24 22.5 L 24 11.5 C 24 10.101774 25.101774 9 26.5 9 z M 31.476562 12.978516 A 1.50015 1.50015 0 0 0 30 14.5 L 30 28.5 C 30 29.346499 29.346499 30 28.5 30 L 18.121094 30 L 19.560547 28.560547 A 1.50015 1.50015 0 0 0 18.470703 25.986328 A 1.50015 1.50015 0 0 0 17.439453 26.439453 L 13.439453 30.439453 A 1.50015 1.50015 0 0 0 13.439453 32.560547 L 17.439453 36.560547 A 1.50015 1.50015 0 1 0 19.560547 34.439453 L 18.121094 33 L 28.5 33 C 30.967501 33 33 30.967501 33 28.5 L 33 14.5 A 1.50015 1.50015 0 0 0 31.476562 12.978516 z">
                </path>
              </svg>
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
                  value={auth.user?.displayName || "аноним"}
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
            style={{
              color: themeC.theme.text,
              background: themeC.theme.background,
              padding: 5,
            }}
          >
            {Object.entries(THEMES).map(([k, v]) => (
              <option value={`${k}`} key={`option-${k}`}>{v.name}</option>
            ))}
          </select>
        </Container>

        <Container css={[cont]}>
          {auth.is_authenticated && (
            <div css={checkCont}>
              <input
                css={check}
                type="checkbox"
                id={"anonymousCheck"}
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              <label css={checkLabel} htmlFor={"anonymousCheck"}>
                Анонимная
              </label>
            </div>
          )}
          <div css={checkCont}>
            {
              /* <input
              type="number"
              id="burnableCheck"
              value={burnable}
              disabled={!anonymous}
              style={{
                color: themeC.theme.text,
                background: themeC.theme.background,
                border: "none",
                borderRadius: 5,
              }}
              onChange={(e) =>
                setBurnable(
                  (+e.target.value === 0 && burnable === -1)
                    ? 1
                    : (+e.target.value ===   0 && burnable === 1)
                    ? -1
                    : (+e.target.value < -1)
                    ? burnable
                    : +e.target.value,
                )}
            /> */
            }
            <label css={labelEter} htmlFor="foreverCheck">
              Вечная статья
            </label>

            <input
              type="checkbox"
              id="foreverCheck"
              checked={isForever}
              onChange={(e) => setForever(e.target.checked)}
            />
            {!isForever && (
              <div>
                <input
                  type="number"
                  id="burnableCheck"
                  value={burnable}
                  disabled={!anonymous}
                  style={{
                    color: themeC.theme.text,
                    background: themeC.theme.background,
                    border: "none",
                    borderRadius: 5,
                  }}
                  onChange={(e) =>
                    setBurnable(
                      (+e.target.value < 1) ? 1 : +e.target.value,
                    )}
                />{" "}
                <label htmlFor="burnableCheck">
                  просмотров до удаления
                </label>
              </div>
            )}
            {
              /* <span style={{ fontSize: "0.8rem" }}>
              Если галочка будет установлена то данная статья будет доступна
              всегда, если галочка будет снята то вы сможете выбрать сколько раз
              нужно будет просмотреть статью чтобы она автоматически было
              удалена
            </span> */
            }
            {
              /*<label css={checkLabel} htmlFor={"burnableCheck"}>
              <p>
                &nbsp;(-1 - бесконечно просматриваемая | 1 - один просмотор | 3
                - три просмотра)
              </p>
            </label> */
            }
          </div>
        </Container>

        <Container css={[cont, contEdit]}>
          <div css={menuEditBtns}>
            {[
              ["h1", "header-one"],
              ["h2", "header-two"],
            ].map(([k, v]) => (
              <button
                css={[menuEdit, h12]}
                onClick={() => {
                  setEditorState(
                    RichUtils.toggleBlockType(editorState, v),
                  );
                }}
              >
                {k}
              </button>
            ))}
            <button
              css={[menuEdit, bold]}
              onClick={() => {
                setEditorState(
                  RichUtils.toggleInlineStyle(editorState, "BOLD"),
                );
              }}
            >
              B
            </button>
            <button
              css={[menuEdit, italic]}
              onClick={() => {
                setEditorState(
                  RichUtils.toggleInlineStyle(editorState, "ITALIC"),
                );
              }}
            >
              i
            </button>
            <button
              css={[menuEdit, bold]}
              onClick={() => {
                setEditorState(
                  RichUtils.toggleInlineStyle(editorState, "UNDERLINE"),
                );
              }}
            >
              _
            </button>
            <button
              css={menuEdit}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";

                input.addEventListener("change", (e: any) => {
                  if (!e.target || !e || !e.target.files) return;
                  const file = e.target.files[0];
                  // @ts-ignore
                  handleFileSelect(file);
                });

                input.click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 37.966015 6.5881101 39.301372 7.5351562 40.291016 A 1.50015 1.50015 0 0 0 8.0820312 40.792969 C 9.0234415 41.545724 10.211116 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 36.695853 38.972662 36.884399 38.931641 37.066406 L 27.181641 25.318359 C 26.309208 24.445927 25.154864 24.009766 24 24.009766 C 22.845136 24.009766 21.688839 24.445927 20.816406 25.318359 L 9.0683594 37.066406 C 9.0273383 36.884399 9 36.695853 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 30.5 13 C 29.125 13 27.903815 13.569633 27.128906 14.441406 C 26.353997 15.313179 26 16.416667 26 17.5 C 26 18.583333 26.353997 19.686821 27.128906 20.558594 C 27.903815 21.430367 29.125 22 30.5 22 C 31.875 22 33.096185 21.430367 33.871094 20.558594 C 34.646003 19.686821 35 18.583333 35 17.5 C 35 16.416667 34.646003 15.313179 33.871094 14.441406 C 33.096185 13.569633 31.875 13 30.5 13 z M 30.5 16 C 31.124999 16 31.403816 16.180367 31.628906 16.433594 C 31.853997 16.686821 32 17.083333 32 17.5 C 32 17.916667 31.853997 18.313179 31.628906 18.566406 C 31.403816 18.819633 31.124999 19 30.5 19 C 29.875001 19 29.596184 18.819633 29.371094 18.566406 C 29.146003 18.313179 29 17.916667 29 17.5 C 29 17.083333 29.146003 16.686821 29.371094 16.433594 C 29.596184 16.180367 29.875001 16 30.5 16 z M 24 26.990234 C 24.38049 26.990234 24.760979 27.139886 25.060547 27.439453 L 36.609375 38.988281 C 36.57229 38.989853 36.537528 39 36.5 39 L 11.5 39 C 11.461809 39 11.426404 38.989909 11.388672 38.988281 L 22.939453 27.439453 C 23.239021 27.139886 23.61951 26.990234 24 26.990234 z">
                </path>
              </svg>
            </button>
            <button
              css={[menuEdit, bold]}
              onClick={() => {
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                  "LINK",
                  "MUTABLE",
                  { url: prompt("URL") },
                );
                const entityKey = contentStateWithEntity
                  .getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, {
                  currentContent: contentStateWithEntity,
                });
                setEditorState(
                  RichUtils.toggleInlineStyle(
                    RichUtils.toggleInlineStyle(
                      RichUtils.toggleLink(
                        newEditorState,
                        newEditorState.getSelection(),
                        entityKey,
                      ),
                      "UNDERLINE",
                    ),
                    "ITALIC",
                  ),
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path d="M 13 13 C 6.9424416 13 2 17.942442 2 24 C 2 30.057558 6.9424416 35 13 35 L 17.5 35 A 1.50015 1.50015 0 1 0 17.5 32 L 13 32 C 8.5635584 32 5 28.436442 5 24 C 5 19.563558 8.5635584 16 13 16 L 17.5 16 A 1.50015 1.50015 0 1 0 17.5 13 L 13 13 z M 30.5 13 A 1.50015 1.50015 0 1 0 30.5 16 L 35 16 C 39.436442 16 43 19.563558 43 24 C 43 28.436442 39.436442 32 35 32 L 30.5 32 A 1.50015 1.50015 0 1 0 30.5 35 L 35 35 C 41.057558 35 46 30.057558 46 24 C 46 17.942442 41.057558 13 35 13 L 30.5 13 z M 11.5 22.5 A 1.50015 1.50015 0 1 0 11.5 25.5 L 36.5 25.5 A 1.50015 1.50015 0 1 0 36.5 22.5 L 11.5 22.5 z" />
              </svg>
            </button>
          </div>
          <Editor
            editorState={editorState}
            onChange={async (e) => {
              setEditorState(e);

              await textHandle({
                target: {
                  value: editorRef.current?.getEditorRef().editor.textContent ||
                    "",
                },
              });
            }}
            handlePastedFiles={(files: Array<File>) => {
              console.log(files);
              files.forEach((i) => handleFileSelect(i));
              return "handled";
            }}
            handleDroppedFiles={(_, files: Array<File>) => {
              console.log(files);
              files.forEach((i) => handleFileSelect(i));
              return "handled";
            }}
            ref={editorRef}
            plugins={[imagePlugin]}
          />
        </Container>
        {errors.length > 0 && (
          <Container>
            <ul>
              {errors.map((error: any, index: any) => (
                <li key={index}>
                  {error.s.join(", ")}
                </li>
              ))}
            </ul>
          </Container>
        )}
      </div>
    </>
  );
};

export default CreateNotePage;
