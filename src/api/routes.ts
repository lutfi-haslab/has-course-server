import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { basicAuth } from "hono/basic-auth";
import { HonoVariables } from "../shared/types";
import { healthHandler } from "./controllers/health";
import userRoutes from "./controllers/users/userRoutes";
import {
  dbMiddleware,
  errorHandler,
  loggerMiddleware,
  sentryMiddleware,
} from "./middlewares";
import { captureException } from "@sentry/bun";
import authRoutes from "./controllers/auth/authRoutes";
import { Context, Next } from "hono";
import authMiddleware from "./middlewares/auth.middleware";
import courseRoute from "./controllers/course/courseRoute";

const app = new OpenAPIHono<{ Variables: HonoVariables }>().basePath("/api");
const apiRoutes = new OpenAPIHono();

let counter = 0;

// Middleware
app.use("*", dbMiddleware);
app.use("*", sentryMiddleware);
app.use(loggerMiddleware);

app.get("/", (c) => {
  counter++;
  console.log(`Request count: ${counter}`);
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});

app.get("/custom-error", (c) => {
  try {
    throw new Error("API throw error test");
  } catch (error) {
    captureException(error);
    return c.json({ message: "API throw error test" });
  }
});

app.route("/auth", authRoutes);
app.route("/users", userRoutes);
app.route("/courses", courseRoute);
app.get("/health", healthHandler);

app.onError(errorHandler);

// Documentation API

app.use(
  "/doc",
  basicAuth({
    username: process.env.SWAGGER_USERNAME ?? "admin",
    password: process.env.SWAGGER_PASSWORD ?? "@dmInSwa99er",
  })
);

app.get(
  "/swagger",
  basicAuth({
    username: process.env.SWAGGER_USERNAME ?? "admin",
    password: process.env.SWAGGER_PASSWORD ?? "@dmInSwa99er",
  }),
  swaggerUI({ url: "/api/doc" })
);

app.doc("/doc", {
  info: {
    title: "Has Course API Documentation",
    version: "v1",
  },
  openapi: "3.1.0",
});

export default app;
