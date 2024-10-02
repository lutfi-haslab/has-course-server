import { Context } from "hono";
import { CourseEnrollmentSchema } from "../../../../entities/models/course.model";
import { CourseEnrollmentsService } from "../../../../services/course.enrollment.service";
import { HonoVariables } from "../../../../shared/types";

export const createCourseEnrollmentHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const data = CourseEnrollmentSchema.parse(await c.req.json());
    const enrollment = await CourseEnrollmentsService(c).createCourseEnrollment(
      data
    );

    return c.json(enrollment, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
