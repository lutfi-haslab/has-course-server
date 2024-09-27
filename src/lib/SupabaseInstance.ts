import { SupabaseClient, createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "http://127.0.0.1:8000";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const createSupabaseClient = (): SupabaseClient => {
  try {
    const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    console.info(`✅ Connected to Supabase`);
    return client;
  } catch (err) {
    console.error("❌ Could not connect to Supabase\n%o", err);
    throw err;
  }
};

let client: SupabaseClient | null = null; // Initialize as null for clarity

export const getSupabaseClient = async (): Promise<SupabaseClient> => {
  if (!client) {
    client = createSupabaseClient();
  }
  return client;
};