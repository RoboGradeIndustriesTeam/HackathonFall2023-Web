import React  from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/tokenContext";

const OauthRedirectPage: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const sp = new URLSearchParams(location.search)
    if (sp.has("code")) {
        auth.setAccessToken(sp.get("code") || "").then(() => navigate("/"))
    }
    
    return <h1>Загрука...</h1>
}

export default OauthRedirectPage;