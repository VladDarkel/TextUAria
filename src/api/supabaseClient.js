import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://npjhmvrurydqoodoxjlw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wamhtdnJ1cnlkcW9vZG94amx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzY0MjQsImV4cCI6MjA0NjMxMjQyNH0.AmxHwf6Q2VGkRKhkDe_XWaCNZxTPB_kAthKeS8HHyxU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
