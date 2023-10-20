import React from "react";
import useInput from "../features/useInput";
import ReactQuill from "react-quill"
import { createAnonymousNote } from "../api/notes";
import { useNavigate } from "react-router";
import 'react-quill/dist/quill.core.css'
const CreateNotePage: React.FC = () => {
  const name = useInput("Название");
  const subname = useInput("Суб-название");
  const [val, setVal] = React.useState<string>("");

  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          onClick={async () => {
            const note = await createAnonymousNote({
              name: name.value,
              subtitle: subname.value,
              body: val,
            });

            if (!("message" in note)) {
              navigate(`/${note.slug}`);
            }
          }}
        >
          Post
        </button>
        <input type="text" {...name} />
        <input type="text" {...subname} />
        <ReactQuill value={val} onChange={(e) => setVal(e)}/>
      </div>
    </>
  );
};

export default CreateNotePage;
