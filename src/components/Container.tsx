import React from "react";
import { cont } from "../styles/globals";
import { ThemeContext } from "../features/theming";
import { css } from "@emotion/react/macro";

const Container: React.FC<React.PropsWithChildren & any> = (props) => {
  const themeC = React.useContext(ThemeContext);
  return (
    <div
      css={[
        cont,
        ...(props.css || [])
      ]}
      style={{
        backgroundColor: themeC.theme.containers,
        ...(props.style || {})
      }}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Container;
