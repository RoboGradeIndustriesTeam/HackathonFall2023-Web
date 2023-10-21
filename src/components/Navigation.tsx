import { cont, jcSb, contLinkdBottom, logo, btn } from "../styles/globals";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";
import Container from "./Container";
import React from "react";
import { ThemeContext } from "../features/theming";

const btns = css`
display: flex; 
flex-direction: row;
`

const NavigationBar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const theme = React.useContext(ThemeContext)


    return <Container css={[jcSb, contLinkdBottom]}>
        <p css={logo} onClick={() => navigate("/create")} style={{color: theme.theme.text}}>статейник</p>
        {auth.is_authenticated
        ? (
            <div css={btns}>
                <div css={btn} onClick={() => navigate("/profile")} style={{color: theme.theme.input}}>
                профиль
                </div>
                <div css={btn} onClick={() => {localStorage.clear(); location.reload()}} style={{color: theme.theme.input}}>
                выход
                </div>
            </div>
        )
        : <div css={btn} onClick={() => navigate("/login")}>вход</div>}
    </Container>
}

export default NavigationBar;