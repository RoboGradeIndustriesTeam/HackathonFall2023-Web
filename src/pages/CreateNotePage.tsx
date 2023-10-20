import React from "react";
import useInput from "../features/useInput";
import {
  Entities,
  EntityComponent,
  entityToMarkdown,
  TEXT_TOOLS,
  ToolType,
} from "../features/text";
import { createAnonymousNote } from "../api/notes";
import { useNavigate } from "react-router";
import TextEditor, { createTextEditor } from "../components/TextEditor";

const CreateNotePage: React.FC = () => {
  const name = useInput("Название");
  const subname = useInput("Суб-название");
  const linkHref = useInput("https://google.com");
  const linkText = useInput("тест");
  const imageSrc = useInput(
    "https://images.unsplash.com/photo-1692363003613-6992b2c5fd3a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D",
  );

  const navigate = useNavigate();
  const t = createTextEditor();
  const { data, setData, tool, setTool } = t;

  return (
    <>
      <div>
        <button onClick={() => setTool("TEXT")}>Текст</button>
        <button onClick={() => setTool("BOLD_TEXT")}>Жирный Тест</button>
        <br />
        <span>Инструмент: {tool}</span>
      </div>

      <div>
        <input type="text" {...linkHref} />
        <input type="text" {...linkText} />
        <button
          onClick={() => {
            setData([
              ...data,
              {
                type: "LINK",
                href: linkHref.value,
                text: linkText.value,
              },
            ]);
          }}
        >
          Ссылка
        </button>
      </div>

      <div>
        <input type="text" {...imageSrc} />
        <button
          onClick={() => {
            setData([
              ...data,
              {
                type: "IMAGE",
                src: imageSrc.value,
              },
            ]);
          }}
        >
          Картинка
        </button>
      </div>

      <div>
        <button
          onClick={() =>
            console.log(
              entityToMarkdown(data.map((i) => [Entities[i.type], i])),
            )}
        >
          Markdown
        </button>
      </div>

      <div>
        <button
          onClick={async () => {
            const note = await createAnonymousNote({
              name: name.value,
              body: entityToMarkdown(data.map((i) => [Entities[i.type], i])),
            });

            if (!("message" in note)) {
              navigate(`/${note.slug}`);
            }
          }}
        >
          Post
        </button>
      </div>

      <TextEditor {...t}></TextEditor>
    </>
  );
};

export default CreateNotePage;
