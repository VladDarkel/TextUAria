import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Ably from "ably";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
