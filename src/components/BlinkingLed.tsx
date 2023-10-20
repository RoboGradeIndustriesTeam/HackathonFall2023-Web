import { css, keyframes } from "@emotion/react";

const blinkAnimation = keyframes`
to {
    visibility: hidden;
}`;

const style = css`
    animation: ${blinkAnimation} 0.8s steps(5, start) infinite;
    -webkit-animation: ${blinkAnimation} 0.8s steps(5, start) infinite;
`;

const BlinkingLed = () => {
  return <span css={style}>|</span>;
};

export default BlinkingLed;
