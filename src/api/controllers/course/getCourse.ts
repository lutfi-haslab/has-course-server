import { Context } from "hono";
import { CourseSchema } from "../../../entities/models/course.model";
import { ResponseSchema, BaseResponseSchema } from "../../../entities/models/response.model";
import { CoursesService } from "../../../services/course.service";
import { HonoVariables } from "../../../shared/types";

export const getCourseHandler = async (c: Context<{ Variables: HonoVariables }>) => {
    try {
      const id = c.req.param("id");
      const course = await CoursesService(c).getCourse(id);
      const response = {
        code: 200,
        status: "success",
        data: course,
        messages: "User registered successfully",
      };
      // Validate the response
      const parsedResponse = ResponseSchema(CourseSchema).parse(response);
  
      // Pass the status code as part of the ResponseInit object
      return c.json(parsedResponse, 200);
    } catch (error) {
      const errorResponse = {
        code: 400,
        status: "error",
        messages: "Invalid input data",
      };
      const parsedErrorResponse = BaseResponseSchema.parse(errorResponse);
      return c.json(parsedErrorResponse, 400);
    }
  };