import { Span } from "@sentry/bun";
import { SupabaseClient } from "@supabase/supabase-js";
import { SessionAuthUserSchema } from "../entities/models/auth.model";
import { z } from "@hono/zod-openapi";

export type HonoVariables = {
  supabaseClient: SupabaseClient;
  parentSpan?: Span;
  user: z.infer<typeof SessionAuthUserSchema>;
};
