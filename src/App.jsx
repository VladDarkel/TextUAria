import React, { useState, useEffect } from "react";
import { supabase } from "./api/supabaseClient";

const App = () => {
  const [user, setUser] = useState(null); // Зберігає інформацію про користувача

  useEffect(() => {
    // Перевіряємо, чи є активна сесія
    const session = supabase.auth.session();
    setUser(session?.user || null);

    // Підписка на зміни автентифікації
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe(); // Очищаємо підписку
    };
  }, []);

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
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <p>User ID: {user.id}</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Log in with Google</button>
      )}
    </div>
  );
};

export default App;
