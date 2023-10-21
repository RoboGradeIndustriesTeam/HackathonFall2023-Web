import { cont, jcSb, contLinkdBottom, logo, btn } from "../styles/globals";
import { useAuth } from "../features/tokenContext";
import { useNavigate } from "react-router";


const MainHeader = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    return <div css={[cont, jcSb, contLinkdBottom]}>
        <p css={logo} onClick={() => navigate("/create")}>статейник</p>
        {auth.is_authenticated
        ? (
            <div css={btn} onClick={() => navigate("/profile")}>
            {auth.user?.username || ""}
            </div>
        )
        : <div css={btn} onClick={() => navigate("/login")}>вход</div>}
    </div>
}

export default MainHeader;