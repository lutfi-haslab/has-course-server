import { SupabaseClient } from "@supabase/supabase-js";
import { Context } from "hono";
import { getSupabaseClient } from "../../../lib/supabaseInstance";


export const connectClientSupabase = async (c: Context): Promise<SupabaseClient | undefined> => {
    let client = c.var.supabaseClient;
    if (!client) {

        client = await getSupabaseClient();
        c.set('supabaseClient', client); // Use lowercase 'supabaseClient' for consistency
        return client;
    };
};