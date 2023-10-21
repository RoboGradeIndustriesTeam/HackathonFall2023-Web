import { css } from "@emotion/react";

export const page = css`
max-width: 100%;
display: flex;
flex-direction: column;
align-items: center;
font-family: Inter;
justify-content: center;
height: 100vh;
`;
export const form = css`
display: flex;
flex-direction: column;
width: 100%;
max-width: 400px
`;

export const cont = css`
background-color: #D9D9D9;
padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
text-align: left;
border-radius: 5px;
width: calc(100% - 28px);
@media (max-width: 400px) {
    border-radius: 0px;
}
`;

export const input = css`
border-bottom: 0px #858585 solid; 
width: calc(100% - 28px);
`;

export const h1 = css`
font-size: 24px;
font-weight: 600;
`;

export const h2 = css`
font-size: 14px;
font-weight: 400;
`;
export const loginInput = css`
font-size: 16px;
font-weight: 800;
text-decoration: underline;
cursor: pointer;
opacity: 1;
transition: opacity .3s;
&:hover {
    opacity: .7;
}

@media (max-width: 400px) {
    border-radius: 0px;
}

background-color: #D9D9D9;
padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
text-align: left;
border-radius: 5px;
width: 100%;
`
export const regInput = css`
cursor: pointer;
font-size: 16px;
font-weight: 400;
text-decoration: underline;
transition: opacity .3s;
&:hover {
    opacity: .7;
}

@media (max-width: 400px) {
    border-radius: 0px;
}

background-color: #D9D9D9;
padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
text-align: left;
border-radius: 5px;
width: calc(100% - 28px);
`