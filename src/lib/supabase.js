import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 
  (typeof process !== "undefined" && process.env ? process.env.NEXT_PUBLIC_SUPABASE_URL : null) || 
  (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : null);

const supabaseAnonKey = 
  (typeof process !== "undefined" && process.env ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : null) || 
  (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : null);

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);