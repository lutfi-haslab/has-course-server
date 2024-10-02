import { Context } from "hono";
import { HonoVariables } from "../shared/types";
import { startSpan } from "@sentry/bun";
import { UserSchema } from "../entities/models/user.model";
import { z } from "@hono/zod-openapi";
import { SessionAuthUserSchema } from "../entities/models/auth.model";

export const UsersService = (c: Context<{ Variables: HonoVariables }>) => {
  const client = c.get("supabaseClient");
  const parentSpan = c.get("parentSpan");

  const getCurrentUser = async (): Promise<
    z.infer<typeof SessionAuthUserSchema>
  > => {
    return startSpan(
      {
        op: "db.query",
        name: "UsersService > getCurrentUser",
        parentSpan,
      },
      async () => {
        const user = c.get("user");
        console.log("user", user);

        // Ensure that `data` is present and is of the expected type
        return user;
      }
    );
  };

  const getUsers = async (
    page: number = 1,
    limit: number = 3
  ): Promise<{ data: z.infer<typeof UserSchema>[]; count: number | null }> => {
    return startSpan(
      {
        op: "db.query",
        name: "UsersService > getUsers",
        parentSpan,
      },
      async () => {
        const offset = (page - 1) * limit;
        const to = offset + limit - 1;

        const response = await client
          ?.from("users")
          .select("*", { count: "exact" })
          .range(offset, to);

        if (response?.error) {
          // Handle the error, e.g., throw it or log it
          throw new Error(response.error.message);
        }
        // Ensure that `data` is present and is of the expected type
        return {
          data: response.data,
          count: response.count,
        };
      }
    );
  };

  return {
    getUsers,
    getCurrentUser,
  };
};
