import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '@manifoldco/react-select-zero/assets/react-select-zero.css';
import moment from "moment";
moment.locale("ru");

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />

  // </React.StrictMode>,
);
