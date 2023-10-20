import { createContext, useContext } from "react";
import { UserDto } from "../api/types";

interface ITokenContext {
    access_token: string | null,
    is_authenticated: boolean,
    user: UserDto | null,
    setAccessToken: (access_token: string) => Promise<void>
}

export const TokenContenxt = createContext<ITokenContext>( {
    access_token: null,
    is_authenticated: false,
    user: null,
    setAccessToken: async () => {}
});

export function useAuth(){
    const ctx = useContext(TokenContenxt);
    return {user: ctx.user, is_authenticated: ctx.is_authenticated, setAccessToken: ctx.setAccessToken}
}