import { Context } from "hono";
import { CourseSchema } from "../../../entities/models/course.model";
import { BaseResponseSchema } from "../../../entities/models/response.model";
import { CoursesService } from "../../../services/course.service";
import { HonoVariables } from "../../../shared/types";

export const updateCourseHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const data = CourseSchema.partial().parse(await c.req.json());
    const course = await CoursesService(c).updateCourse(id, data);

    return c.json(course, 200);
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
