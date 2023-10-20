import { client } from "./client";
import { ApiError, CreateNoteDto, NoteDto } from "./types";

export async function createAnonymousNote(data: CreateNoteDto): Promise<ApiError | NoteDto> {
    const resp = await client.post("/notes/anonymous", {
        ...data
    });

    return resp.data;
}

export async function getNote(slug: string): Promise<ApiError | NoteDto> {
    const resp = await client.get(`/notes/${slug}`)

    return resp.data;
}