import { z } from "@hono/zod-openapi";
import { Context } from "hono";
import { CourseSchema } from "../../../entities/models/course.model";
import { ResponseSchema, BaseResponseSchema } from "../../../entities/models/response.model";
import { CoursesService } from "../../../services/course.service";
import { HonoVariables } from "../../../shared/types";

export const getAllCourseHandler = async (
    c: Context<{ Variables: HonoVariables }>
  ) => {
    try {
      const { page, limit } = c.req.query();
      const { data: courses, count } = await CoursesService(c).getCourses(
        Number(page),
        Number(limit)
      );
  
      const response = {
        code: 200,
        status: "success",
        data: courses,
        messages: "User registered successfully",
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: Number(count),
        },
      };
  
      console.log("response", response);
      // Validate the response
      const parsedResponse = ResponseSchema(z.array(CourseSchema)).parse(
        response
      );
  
      // Pass the status code as part of the ResponseInit object
      return c.json(parsedResponse, 200);
    } catch (error) {
      console.log("error", JSON.parse(error));
      const errorResponse = {
        code: 400,
        status: "error",
        messages: "Invalid input data",
      };
      const parsedErrorResponse = BaseResponseSchema.parse(errorResponse);
      return c.json(parsedErrorResponse, 400);
    }
  };