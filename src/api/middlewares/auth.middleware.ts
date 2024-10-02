import { Context, type MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { HonoVariables } from "../../shared/types";

const authMiddleware: MiddlewareHandler = async (
  c: Context<{ Variables: HonoVariables }>,
  next
) => {
  const client = c.get("supabaseClient");
  const refresh_token = getCookie(c, "refresh_token");
  const access_token = getCookie(c, "access_token");
  const { data, error } = await client.auth.getUser(access_token);

  if (data?.user) {
    c.set("user", {
      id: data.user.id as string,
      email: data.user.email as string,
      created_at: data.user.created_at as string,
      updated_at: data.user.updated_at as string,
    });
  }
  //TODO: handle error properly
  if (error) {
    console.error("Error while getting user by access_token ", error);
    if (!refresh_token) {
      // throw new HTTPException(403, { message: "No refresh token" });
      return c.json({
        message: "No refresh token",
        code: 403,
        status: "error",
      }, 403);
    }

    const { data: refreshed, error: refreshError } =
      await client.auth.refreshSession({
        refresh_token,
      });

    if (refreshError) {
      console.error("Error while refreshing token", refreshError);
      return c.json({
        message: " Error while refreshing token",
        code: 403,
        status: "error",
      }, 403);
    }

    if (refreshed.user) {
      c.set("user", {
        id: refreshed.user.id as string,
        email: refreshed.user.email as string,
        created_at: refreshed.user.created_at as string,
        updated_at: refreshed.user.updated_at as string,
      });
    }
  }

  await next();
};

export default authMiddleware;
