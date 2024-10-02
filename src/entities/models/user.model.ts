import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
    id: z.number().default(1),
    updated_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
    created_at: z.string().default("2024-09-25T18:23:27.906+00:00"),
    email: z.string().email().default('test@example.com'),
    reset_password_token: z.string().nullable(),
    reset_password_expiration: z.string().nullable(),
    salt: z.string().nullable(),
    hash: z.string().nullable(),
    login_attempts: z.number().default(3),
    lock_until: z.string().nullable(),
    uuid: z.string().nullable()
});

