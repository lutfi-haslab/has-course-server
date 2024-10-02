import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { LessonSchema } from "../../../../../entities/models/course.model";
import { BaseResponseSchema } from "../../../../../entities/models/response.model";
import { HonoVariables } from "../../../../../shared/types";
import { createLessonHandler } from "./createLesson";
import { getLessonHandler } from "./getLesson";
import { updateLessonHandler } from "./updateLesson";

const app = new OpenAPIHono<{ Variables: HonoVariables }>();
app.openapi(
    createRoute({
      method: "post",
      path: "",
      request: {
        body: {
          required: true,
          content: {
            "application/json": {
              schema: LessonSchema,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Lesson created",
          content: {
            "application/json": {
              schema: LessonSchema,
            },
          },
        },
        400: {
          description: "Invalid input data",
          content: {
            "application/json": {
              schema: BaseResponseSchema,
            },
          },
        },
      },
    }),
    createLessonHandler
  );

  app.openapi(
    createRoute({
      method: "get",
      path: "/:id",
      responses: {
        200: {
          description: "Lesson fetched",
          content: {
            "application/json": {
              schema: LessonSchema,
            },
          },
        },
        400: {
          description: "Invalid input data",
          content: {
            "application/json": {
              schema: BaseResponseSchema,
            },
          },
        },
      },
    }),
    getLessonHandler
  );
  
  app.openapi(
    createRoute({
      method: "put",
      path: "/:id",
      request: {
        body: {
          required: true,
          content: {
            "application/json": {
              schema: LessonSchema.partial(),
            },
          },
        },
      },
      responses: {
        200: {
          description: "Lesson updated",
          content: {
            "application/json": {
              schema: LessonSchema,
            },
          },
        },
        400: {
          description: "Invalid input data",
          content: {
            "application/json": {
              schema: BaseResponseSchema,
            },
          },
        },
      },
    }),
    updateLessonHandler
  );
  
  export default app;