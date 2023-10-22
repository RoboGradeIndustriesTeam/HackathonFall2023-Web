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
font-size: 16px;
transition: .3s;
&:focus-visible {
    outline: 0;
    -webkit-box-shadow: 0px 0px 0px 3px #5c5c5c;
    -moz-box-shadow: 0px 0px 0px 3px #5c5c5c;
    box-shadow: 0px 0px 0px 3px #5c5c5c;
}
`;

export const h1 = css`
font-size: 38px;
font-weight: 600;
margin-bottom: 1.75rem;
text-align: center;
`;

export const h2 = css`
font-size: 14px;
font-weight: 400;
`;
export const loginInput = css`
font-size: 18px;
font-weight: 800;
cursor: pointer;
opacity: 1;
transition: opacity .3s;
&:hover {
    opacity: .7;
}
@media (max-width: 400px) {
    border-radius: 0px;
}
text-align: center;
background-color: #4CAF50;
color: white;
padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
border-radius: 5px;
width: 100%;
margin-top:1rem;
`
export const regInput = css`
cursor: pointer;
font-size: 16px;
font-weight: 400;
transition: opacity .3s;
&:hover {
    opacity: .5;
}
text-align: center;
border: 0;
width: 100%;
margin-top:0.4rem;
color:green;
`

export const logo = css`
text-align: center;
font-style: italic;
font-weight: 500;
margin-bottom: 15px;
filter: drop-shadow(1px 1px 1px #ffffff);
cursor:pointer;
transition:1.4s;

`

export const loginSocial = css`
color: white;
background: #D9D9D9;

cursor: pointer;
opacity: 1;
transition: opacity .3s;
&:hover {
    opacity: .7;
}
padding: 6px 6px; 
margin-bottom: 15px;
border: 0;
border-radius: 5px;
width: 100%;
margin-right: 15px;
&:last-child {
    margin-right: 0px;
}
text-align: center
`