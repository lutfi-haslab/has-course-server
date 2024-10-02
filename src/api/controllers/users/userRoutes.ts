import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HonoVariables } from "../../../shared/types";
import { getUsersHandler } from "./getUsers";
import { UserSchema } from "../../../entities/models/user.model";
import {
  ResponseSchema,
  BaseResponseSchema,
} from "../../../entities/models/response.model";
import { signUpHandler } from "../auth/signUp";
import { getCurrentUserHandler } from "./getUser";
import { SessionAuthUserSchema } from "../../../entities/models/auth.model";
import authMiddleware from "../../middlewares/auth.middleware";

// const app = new Hono()
//   .get("/", getUsersHandler);

const app = new OpenAPIHono<{ Variables: HonoVariables }>();
app.use("*", authMiddleware);

app.openapi(
  createRoute({
    method: "get",
    path: "/all",
    responses: {
      200: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: ResponseSchema(z.array(UserSchema)),
          },
        },
      },
      400: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: BaseResponseSchema,
          },
        },
      },
      403: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: BaseResponseSchema,
          },
        },
      },
    },
  }),
  getUsersHandler
);


app.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: ResponseSchema(SessionAuthUserSchema),
          },
        },
      },
      400: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: BaseResponseSchema,
          },
        },
      },
    },
  }),
  getCurrentUserHandler
);

export default app;
