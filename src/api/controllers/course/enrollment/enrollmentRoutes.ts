import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { CourseEnrollmentSchema } from "../../../../entities/models/course.model";
import { BaseResponseSchema } from "../../../../entities/models/response.model";
import { HonoVariables } from "../../../../shared/types";
import { createCourseEnrollmentHandler } from "./createEnrollment";
import { getCourseEnrollmentHandler } from "./getEnrollment";
import { updateCourseEnrollmentHandler } from "./updateEnrollment";

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
              schema: CourseEnrollmentSchema,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Course enrollment created",
          content: {
            "application/json": {
              schema: CourseEnrollmentSchema,
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
    createCourseEnrollmentHandler
  );
  
  app.openapi(
    createRoute({
      method: "get",
      path: "/:id",
      responses: {
        200: {
          description: "Course enrollment fetched",
          content: {
            "application/json": {
              schema: CourseEnrollmentSchema,
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
    getCourseEnrollmentHandler
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
              schema: CourseEnrollmentSchema.partial(),
            },
          },
        },
      },
      responses: {
        200: {
          description: "Course enrollment updated",
          content: {
            "application/json": {
              schema: CourseEnrollmentSchema,
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
    updateCourseEnrollmentHandler
  );

  export default app;