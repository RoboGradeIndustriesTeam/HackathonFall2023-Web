import React from "react";

export interface ITheme {
    background: string;
    text: string;
    containers: string;
    input: string;
}

export interface IThemeContext {
    theme: ITheme;
    setTheme: (theme: ITheme) => void
}

export const THEMES: Record<string, {name: string, theme: ITheme}> = {
    "default": {
        name: "Светлая",
        theme: {
            background: "#fff",
            text: "#000",
            containers: "#D9D9D9",
            input: "#000"
        }
    },
    "dark": {
        name: "Тёмная",
        theme: {
            background: "#303030",
            text: "#fff",
            containers: "#000000",
            input: "#fff"
        }
    },
    "barbie": {
        name: "Барби",
        theme: {
            background: "#ff00bf",
            text: "#000",
            containers: "#ff00ff",
            input: "#000"
        }
    }
}
export const ThemeContext = React.createContext<IThemeContext>({
    theme: THEMES.default.theme,
    setTheme: (theme) => {}
});

