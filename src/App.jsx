import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "./api/supabaseClient";
import { Graph } from "graphlib";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  // Підписка на зміни таблиці Items
  const channel = supabase
    .channel("realtime:items")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Items" },
      (payload) => {
        console.log("Change received!", payload);
        handleRealtimeUpdate(payload);
      }
    )
    .subscribe();

  // Функція для обробки змін у режимі реального часу
  function handleRealtimeUpdate(payload) {
    const { eventType, new: newItem, old: oldItem } = payload;
    setItems((currentItems) => {
      switch (eventType) {
        case "INSERT":
          return [...currentItems, newItem];
        case "UPDATE":
          return currentItems.map((item) =>
            item.id === newItem.id ? newItem : item
          );
        case "DELETE":
          return currentItems.filter((item) => item.id !== oldItem.id);
        default:
          return currentItems;
      }
    });
  }

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
    </div>
  );
};

export default App;
