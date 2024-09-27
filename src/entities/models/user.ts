import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
    id: z.number().default(1),
    updated_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
    created_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
    email: z.string().email().default('test@example.com'),
    reset_password_token: z.string().nullable().default(""),
    reset_password_expiration: z.string().nullable().default(""),
    salt: z.string().default('salt'),
    hash: z.string().default('hash'),
    login_attempts: z.number().default(3),
    lock_until: z.string().nullable().default(""),
});

