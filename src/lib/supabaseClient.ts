import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL o Anon Key no están definidos. El cliente Supabase no funcionará correctamente si no se usan mocks o alternativas.");
}

export const supabase = (supabaseUrl && supabaseAnonKey)
                          ? createClient(supabaseUrl, supabaseAnonKey)
                          : null;

