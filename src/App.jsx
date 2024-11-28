import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "./api/supabaseClient";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data } = await supabase.from("Items").select();
    setCountries(data);
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
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
