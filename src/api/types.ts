export interface UserRegisterDto {
  username: string;
  password: string;
}

export interface UserRegisterResponseDto {
  access_token: string;
  username: string;
}
export interface UserLoginDto {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  access_token: string;
}

export interface UserDto {
  _id: string;
  username: string;
  password: string;
}

export interface ApiError {
  message: string;
  errorCode: number;
  error: true;
}

export interface CreateNoteDto {
  name: string;
  body: string;
}

export interface NoteDto {
  _id: string;
  title: string;
  body: string;
  slug: string;
  authorName: string;
  author: UserDto | null;
}
