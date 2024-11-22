import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Ably from "ably";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import "./index.css";
import App from "./App.jsx";

const ablyclient = new Ably.Realtime({
  key: "muB2gA.bsOjzQ:4VtEHW9Y1mutqM7CADDsYqVPzEbaOl8lv9LWoLdSQ-c",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
