import { Context, Next } from "hono";
import { HonoVariables } from "../../shared/types";
import { connectClientSupabase } from "../../shared/config/databases";

export const dbMiddleware = async (c: Context<{Variables: HonoVariables}>, next: Next) => {
    const client = await connectClientSupabase(c);
    c.set('supabaseClient', client);
    return next();
}