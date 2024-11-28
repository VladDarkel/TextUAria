import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

<<<<<<< HEAD
=======
import * as Ably from "ably";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import "./index.css";

const client = new Ably.Realtime({
  key: process.env.ABLY_API_KEY,
});

>>>>>>> e2686273790210a9cd32e6d382faa92c11ef296c
export default function App() {
  return <p>Hello</p>;
}
