import { cont, jcSb, contLinkdBottom, logo, btn } from "../styles/globals";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";
import { css } from "@emotion/react";

const btns = css`
display: flex; 
flex-direction: row;
`

const MainHeader = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    return <div css={[cont, jcSb, contLinkdBottom]}>
        <p css={logo} onClick={() => navigate("/create")}>статейник</p>
        {auth.is_authenticated
        ? (
            <div css={btns}>
                <div css={btn} onClick={() => navigate("/profile")}>
                профиль
                </div>
                <div css={btn} onClick={() => {localStorage.clear(); location.reload()}}>
                выход
                </div>
            </div>
        )
        : <div css={btn} onClick={() => navigate("/login")}>вход</div>}
    </div>
}

export default MainHeader;