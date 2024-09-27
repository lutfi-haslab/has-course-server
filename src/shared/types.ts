import { Span } from "@sentry/bun";
import { SupabaseClient } from "@supabase/supabase-js";

export type HonoVariables = {
    supabaseClient: SupabaseClient | undefined;
    parentSpan?: Span
}