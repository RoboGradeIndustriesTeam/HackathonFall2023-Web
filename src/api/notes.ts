import { client } from "./client";
import { ApiError, CreateAnonymousNoteDto, CreateNoteDto, NoteDto } from "./types";

export async function createAnonymousNote(data: CreateAnonymousNoteDto): Promise<ApiError | NoteDto> {
    const resp = await client.post("/notes/anonymous", {
        ...data
    });

    return resp.data;
}

export async function createNote(data: CreateNoteDto, access_token: string): Promise<ApiError | NoteDto> {
    const resp = await client.post("/notes", {
        ...data
    }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    return resp.data;
}

export async function updateNote(data: string, access_token: string, slug: string): Promise<ApiError | NoteDto> {
    const resp = await client.put(`/notes/${slug}`, {
        body: data
    }, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    return resp.data;
}

export async function getUserNotes(username: string): Promise<ApiError | NoteDto[]> {
    const resp = await client.get(`/notes/user/${username}`)

    return resp.data;
}



export async function getNote(slug: string): Promise<ApiError | NoteDto> {
    const resp = await client.get(`/notes/${slug}`)

    return resp.data;
}