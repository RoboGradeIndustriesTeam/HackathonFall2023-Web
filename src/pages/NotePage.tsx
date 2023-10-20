import React from "react";
import Markdown from 'react-markdown'
import { useNavigate, useParams } from "react-router";
import { getNote } from "../api/notes";
const NotePage: React.FC = () => {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = React.useState("Загрузка");
    const [body, setBody] = React.useState("Загрузка");

    React.useEffect(() => {
        if (!slug) navigate("/");
        else
            (async () => {
                const note = await getNote(slug);
                if ("message" in note) {
                    navigate("/error")
                }
                else {
                    setAuthor(note.authorName);
                    setBody(note.body);
                }
            })();
    }, []);
    return <>
        <h1>Author: <span>{author}</span></h1>
        <hr />
        <span>
        <Markdown >{body}</Markdown>
        </span>
    </>
}

export default NotePage;