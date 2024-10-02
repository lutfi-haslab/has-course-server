import { z } from "@hono/zod-openapi";
import { startSpan } from "@sentry/bun";
import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { AuthUserSchema } from "../entities/models/auth.model";
import { HonoVariables } from "../shared/types";

export const AuthService = (c: Context<{ Variables: HonoVariables }>) => {
  const client = c.get("supabaseClient");
  const parentSpan = c.get("parentSpan");

  const registerUser = async (email: string, password: string) => {
    return startSpan(
      {
        op: "db.query",
        name: "AuthService > registerUser",
        parentSpan,
      },
      async (): Promise<z.infer<typeof AuthUserSchema> | null> => {
        const { data, error } = await client.auth.admin.createUser({
          email,
          password,
          user_metadata: { name: email.split("@")[0] },
          email_confirm: true,
        });

        if (error || !data?.user?.email) {
          console.log(error);
          throw new Error(error?.message || "Error while signing up");
        }

        const dbUser = {
          uuid: data?.user.id,
          email: data?.user.email,
          created_at: data?.user.created_at,
          updated_at: data?.user.updated_at,
        };

        const user = await client.from("users").insert(dbUser);
        console.log(user);
        if (user) {
          return data?.user;
        } else {
          return null;
        }
      }
    );
  };

  const loginUser = async (email: string, password: string) => {
    return startSpan(
      {
        op: "db.query",
        name: "AuthService > loginUser",
        parentSpan,
      },
      async (): Promise<z.infer<typeof AuthUserSchema>> => {
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Error while signing in", error);
          throw new HTTPException(401, { message: error.message });
        }

        setCookie(c, "access_token", data?.session.access_token, {
          ...(data?.session.expires_at && {
            expires: new Date(data.session.expires_at),
          }),
          httpOnly: true,
          path: "/",
          secure: true,
        });

        setCookie(c, "refresh_token", data?.session.refresh_token, {
          ...(data?.session.expires_at && {
            expires: new Date(data.session.expires_at),
          }),
          httpOnly: true,
          path: "/",
          secure: true,
        });

        return data?.user || [];
      }
    );
  };

  return {
    registerUser,
    loginUser,
  };
};
