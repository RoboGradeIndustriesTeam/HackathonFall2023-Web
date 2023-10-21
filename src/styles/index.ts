import { css } from "@emotion/react";

const page = css`
font-family: Inter;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const form = css`
display: flex;
flex-direction: column;
max-width: 400px;
width: 100%
`;

const cont = css`
background-color: #D9D9D9;
padding: 18px 14px; 
margin-bottom: 15px;
border: 0;
text-align: left;
border-radius: 5px;
max-width: 372px;
width: 100%
`;

const input = css`
border-bottom: 2px #858585 solid; 
`;

const h1 = css`
font-size: 24px;
font-weight: 600;
`;

const h2 = css`
font-size: 14px;
font-weight: 400;
`;
const loginInput = css`
max-width: 400px;
font-size: 16px;
font-weight: 800;
text-decoration: underline;
cursor: pointer;
opacity: 1;
transition: opacity .3s;
&:hover {
  opacity: .7;
}
`
const regInput = css`
cursor: pointer;
font-size: 16px;
font-weight: 400;
text-decoration: underline;
transition: opacity .3s;
&:hover {
  opacity: .7;
}
max-width: 372px;
`