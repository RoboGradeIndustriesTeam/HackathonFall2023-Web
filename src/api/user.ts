import { client } from "./client";
import { ApiError, UserDto, UserLoginDto, UserLoginResponse, UserRegisterDto, UserRegisterResponseDto } from "./types";

export async function register(data: UserRegisterDto): Promise<UserRegisterResponseDto | ApiError> {
    /* /auth/register */
    const resp = await client.post<UserRegisterResponseDto | ApiError>("/auth/register", {
        ...data
    });

    return resp.data
}

export async function login(data: UserLoginDto): Promise<UserLoginResponse | ApiError> {
    /* /auth/login */
    const resp = await client.post<UserLoginResponse | ApiError>("/auth/login", {
        ...data
    });

    return resp.data
}

export async function getUser(access_token: string): Promise<UserDto | ApiError> {
    /* /auth/me */
    const resp = await client.get<UserDto | ApiError>("/auth/me", {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    return resp.data
}