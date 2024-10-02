import { z } from "@hono/zod-openapi";

const FactorSchema = z.object({
  id: z.string(),
  friendly_name: z.string().optional(),
  factor_type: z.union([z.literal("totp"), z.literal("phone"), z.string()]),
  status: z.union([z.literal("verified"), z.literal("unverified")]),
  created_at: z.string(),
  updated_at: z.string(),
});

const UserAppMetadataSchema = z
  .object({
    provider: z.string().optional(),
    // Allow any other additional properties
  })
  .catchall(z.any());

const UserMetadataSchema = z.record(z.any());

const UserIdentitySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  identity_data: z.record(z.any()).optional(),
  identity_id: z.string(),
  provider: z.string(),
  created_at: z.string().optional(),
  last_sign_in_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const AuthUserSchema = z.object({
  id: z.string(),
  app_metadata: UserAppMetadataSchema,
  user_metadata: UserMetadataSchema,
  aud: z.string(),
  confirmation_sent_at: z.string().optional(),
  recovery_sent_at: z.string().optional(),
  email_change_sent_at: z.string().optional(),
  new_email: z.string().optional(),
  new_phone: z.string().optional(),
  invited_at: z.string().optional(),
  action_link: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  created_at: z.string(),
  confirmed_at: z.string().optional(),
  email_confirmed_at: z.string().optional(),
  phone_confirmed_at: z.string().optional(),
  last_sign_in_at: z.string().optional(),
  role: z.string().optional(),
  updated_at: z.string().optional(),
  identities: z.array(UserIdentitySchema).optional(),
  is_anonymous: z.boolean().optional(),
  factors: z.array(FactorSchema).optional(),
});

export class AuthServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const SessionAuthUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
