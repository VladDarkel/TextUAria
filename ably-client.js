import Ably from "ably";

const ably = new Ably.Realtime(
  "muB2gA.bsOjzQ:4VtEHW9Y1mutqM7CADDsYqVPzEbaOl8lv9LWoLdSQ-c"
);

const channel = ably.channels.get("apollo-updates");
const channel2 = ably.channels.get("get-started");

channel.subscribe("greetings", (message) => {
  console.log("greetings:", message);
});

channel.subscribe("just", (message) => {
  console.log("just:", message);
});

channel2.subscribe("first", (message) => {
  console.log("get-started:", message);
});
