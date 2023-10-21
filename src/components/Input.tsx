import React from "react";
import { cont } from "../styles/globals";
import { ThemeContext } from "../features/theming";
import { css } from "@emotion/react/macro";

const Input: React.FC<React.PropsWithChildren & any> = (props) => {
  const themeC = React.useContext(ThemeContext);
  return (
    <input
      css={[
        // cont,
        ...(props.css || [])
      ]}
      style={{
        color: themeC.theme.input,
        ...(props.style || {})
      }}
      {...props}
    >
      {props.children}
    </input>
  );
};

export default Input;
