import React from "react";

interface IThemeContext {
    background: string;
    text: string;
    containers: string;

}

export const ThemeContext = React.createContext<IThemeContext>({
    background: "#fff",
    text: "#000",
    containers: "#D9D9D9"
});

export const defaultTheme = {
    background: "#fff",
    text: "#000",
    containers: "#D9D9D9"

}

export const darkTheme = {
    background: "#040D12",
    text: "#fff",
    containers: "#000000"

}