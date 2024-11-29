import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "./api/supabaseClient";
import { Graph } from "graphlib";

const App = () => {
  const [graph, setGraph] = useState();
  const g = new Graph();
  g.setNode("A");
  g.setNode("B", { color: "red" });
  g.setEdge("A", "B"); // Ребро від A до B
  g.setEdge("B", "C", { weight: 5 });
  console.log(g.nodes());
  console.log(g.edges());

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
    setGraph([g.nodes(), g.edges()]);
  }, []);

  async function getItems() {
    const { data } = await supabase.from("Items").select();
    setItems(data);
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error("Error logging in:", error.message);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out:", error.message);
  };

  return (
    <div>
      <button onClick={handleLogin}>Log in with Google</button>
      <button onClick={handleLogout}>Log out</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p>{JSON.stringify(graph)}</p>
    </div>
  );
};

export default App;
