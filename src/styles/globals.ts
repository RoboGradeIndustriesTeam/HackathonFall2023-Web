import { css } from "@emotion/react";

export const page = css`
max-width: 100%;
display: flex;
flex-direction: column;
align-items: center;
font-family: Inter;
`;

export const authorCss = css`
font-size: 14px;
margin: 0;
`;

export const w100 = css`
width: 100%;
`;

export const cont = css`
border-radius: 5px; 
background-color: #FFFFFF;
padding: 14px 18px;
width: 100%;
max-width: 1000px;
margin-bottom: 15px;


@media (max-width: 400px) {
  border-radius: 0px;
  padding: 14px 0px;
}
`;

export const articleName = css`
font-size: 24px;
font-weight: 600;
margin: 0;
word-wrap: break-word
`;

export const logo = css`
cursor: pointer;
color: black;
font-size: 18px;
font-style: italic;
font-weight: 500;
word-wrap: break-word;
margin: 0;
transition: .3s;
opacity: 1;
&:hover {
    opacity: .7;
    color: #EE1D00;
}
`;
export const jcSb = css`
display: inline-flex;
justify-content: space-between;
align-items: center;
padding:20px;
`;
export const contLinkdBottom = css`
border-radius: 0;
border-bottom-left-radius: 5px; 
border-bottom-right-radius: 5px; 
`;
export const btn = css`
color: black;
font-size: 17px;
font-weight: 400;
margin-left:10px;
word-wrap: break-word;
cursor: pointer;
transition: opacity .3s;
opacity: 1;
margin-right: 10px;
&:hover {
    opacity: .6;
}
&:last-child {
    margin-right: 0px;
}
display: inline-flex;
align-items: center;
}
`;
export const articleSubtitle = css`
font-size: 14px;
font-weight: 400;
word-wrap: break-word;
margin: 0;
`;
export const contentName = css`
max-width: calc(100% - 160px);
`;

export const contEdit = css`
max-width: 1000px;
padding: 14px 18px;

`;
export const editor = css`
border-radius: 5px;
`;
export const contLinkdTop = css`
border-radius: 0;
border-top-left-radius: 5px; 
border-top-right-radius: 5px; 
border-bottom: 1px #939393 solid; 
margin-bottom: 0;
`;
export const btnCont = css`
color: black;
font-size: 12px;
font-weight: 400;
text-decoration: underline;
word-wrap: break-word;
cursor: pointer;
transition: opacity .3s;
opacity: 1;
&:hover {
    opacity: .6;
}
`;

export const contModal = css`
width: 100%;
max-width: 415px;
`;
export const dialogStyle = css`
&::backdrop {
  background: rgba(0, 0, 0, 0.25); 
  backdrop-filter: blur(4px);
  
}
&:focus-visible {
  outline: 0;
}

border: none;
background: 0;
width: 100%;
max-width: 451px;
`;

export const check = css`
cursor: pointer;
width: 1.1rem;
height: 1.1rem;
`
export const checkLabel = css`
cursor: pointer;
margin-top:1.7px;
`


export const errorDiv = css`
display:flex;
height:100vh;
justify-content:center;
align-items:center;
flex-direction:column;
`;
export const svgDiv = css`
width: 400px !important;
height:400px !important;
`;

export const errorMsg = css`

margin-bottom:2rem; 
`;

export const errorButton = css`
width:170px;
height:50px;
font-size:1rem;
margin-top:20px;
display:flex;
justify-content:center;
align-items:center;
border-radius:10px;
background-color:transparent;
border-width:4px;
cursor:pointer;
transtion:2s;
&:hover
{
background-color:black;
color:white;
}
`;