import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RecoilContextProvider from "./provider/recoil.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilContextProvider>
    <App />
  </RecoilContextProvider>,
);
