import { createClient } from "@supabase/supabase-js";
const PROYECT_URL = import.meta.env.VITE_PROYECT_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
export const supabase = createClient(PROYECT_URL, API_KEY);
