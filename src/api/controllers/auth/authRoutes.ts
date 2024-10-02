import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { AuthUserSchema } from "../../../entities/models/auth.model";
import {
  BaseResponseSchema,
  ResponseSchema,
} from "../../../entities/models/response.model";
import { UserSchema } from "../../../entities/models/user.model";
import { HonoVariables } from "../../../shared/types";
import { signUpHandler } from "./signUp";
import { signInHandler } from "./signIn";

const app = new OpenAPIHono<{ Variables: HonoVariables }>();

app.openapi(
  createRoute({
    method: "post",
    path: "/sign-up",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: z.object({
              email: z.string().email(),
              password: z.string(),
              confirmPassword: z.string(),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: ResponseSchema(AuthUserSchema),
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
  signUpHandler
);

app.openapi(
  createRoute({
    method: "post",
    path: "/sign-in",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: z.object({
              email: z.string().email(),
              password: z.string(),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Respond a message",
        content: {
          "application/json": {
            schema: ResponseSchema(AuthUserSchema),
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
  signInHandler
);

export default app;
