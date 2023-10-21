import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { ThemeContext, darkTheme, defaultTheme } from "./features/themeing.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeContext.Provider value={darkTheme}>

  <App />
  </ThemeContext.Provider>
  // </React.StrictMode>,
);
