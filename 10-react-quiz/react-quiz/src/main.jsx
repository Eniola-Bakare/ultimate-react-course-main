import React from "react";
import ReactDOM from "react-dom/client";
// import App from './components/App'
import App from "./components/App";
import "./index.css";
import { QuizContextProvider } from "./contexts/QuizContexts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
  </React.StrictMode>
);
