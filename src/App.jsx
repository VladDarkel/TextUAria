import React from "react";
import { supabase } from "./api/supabaseClient";

const App = () => {
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
    </div>
  );
};

export default App;
