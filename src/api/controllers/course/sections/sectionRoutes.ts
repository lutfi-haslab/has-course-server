import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { SectionSchema } from "../../../../entities/models/course.model";
import { BaseResponseSchema } from "../../../../entities/models/response.model";
import { HonoVariables } from "../../../../shared/types";
import { createSectionHandler } from "./createSection";
import { getSectionHandler } from "./getSection";
import { updateSectionHandler } from "./updateSection";

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
              schema: SectionSchema,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Section created",
          content: {
            "application/json": {
              schema: SectionSchema,
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
    createSectionHandler
  );
  
  app.openapi(
    createRoute({
      method: "get",
      path: "/:id",
      responses: {
        200: {
          description: "Section fetched",
          content: {
            "application/json": {
              schema: SectionSchema,
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
    getSectionHandler
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
              schema: SectionSchema.partial(),
            },
          },
        },
      },
      responses: {
        200: {
          description: "Section updated",
          content: {
            "application/json": {
              schema: SectionSchema,
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
    updateSectionHandler
  );

  export default app;