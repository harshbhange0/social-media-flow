import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import RecoilContextProvider from "./provider/recoil.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilContextProvider>
  </StrictMode>,
);
