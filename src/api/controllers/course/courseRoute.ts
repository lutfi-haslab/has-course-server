import { Context } from "hono";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { startSpan } from "@sentry/bun";
import {
  BaseResponseSchema,
  ResponseSchema,
} from "../../../entities/models/response.model";
import { HonoVariables } from "../../../shared/types";
import authMiddleware from "../../middlewares/auth.middleware";
import sectionRoutes from "./sections/sectionRoutes";
import lessonRoutes from "./sections/lessons/lessonRoutes";
import { CourseSchema } from "../../../entities/models/course.model";
import { createCourseHandler } from "./createCourse";
import { getAllCourseHandler } from "./getAllCourse";
import { getCourseHandler } from "./getCourse";
import { updateCourseHandler } from "./updateCourse";
import enrollmentRoutes from "./enrollment/enrollmentRoutes";

// Routes
const app = new OpenAPIHono<{ Variables: HonoVariables }>();
app.use("*", authMiddleware);
app.route("/sections", sectionRoutes);
app.route("/lessons", lessonRoutes);
app.route("/course_enrollments", enrollmentRoutes);

app.openapi(
  createRoute({
    method: "post",
    path: "",
    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: CourseSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Course created",
        content: {
          "application/json": {
            schema: ResponseSchema(CourseSchema),
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
  createCourseHandler
);

app.openapi(
  createRoute({
    method: "get",
    path: "/:id",
    responses: {
      200: {
        description: "Course fetched",
        content: {
          "application/json": {
            schema: ResponseSchema(CourseSchema),
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
  getCourseHandler
);

app.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "Course fetched",
        content: {
          "application/json": {
            schema: ResponseSchema(z.array(CourseSchema)),
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
  getAllCourseHandler
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
            schema: CourseSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Course updated",
        content: {
          "application/json": {
            schema: CourseSchema,
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
  updateCourseHandler
);

export default app;
