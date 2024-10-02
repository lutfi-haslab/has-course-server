import { Context } from "hono";
import { CourseSchema } from "../../../entities/models/course.model";
import { ResponseSchema, BaseResponseSchema } from "../../../entities/models/response.model";
import { CoursesService } from "../../../services/course.service";
import { HonoVariables } from "../../../shared/types";

export const createCourseHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const data = CourseSchema.parse(await c.req.json());
    const course = await CoursesService(c).createCourse(data);
    console.log("course", course);
    const response = {
      code: 201,
      status: "success",
      data: data,
      messages: "Course created successfully",
    };
    const parsedResponse = ResponseSchema(CourseSchema).parse(response);

    return c.json(parsedResponse, 201);
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
