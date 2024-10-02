import { Context } from "hono";
import { CourseEnrollmentSchema } from "../../../../entities/models/course.model";
import { CourseEnrollmentsService } from "../../../../services/course.enrollment.service";
import { HonoVariables } from "../../../../shared/types";

export const updateCourseEnrollmentHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const data = CourseEnrollmentSchema.partial().parse(await c.req.json());
    const enrollment = await CourseEnrollmentsService(c).updateCourseEnrollment(
      id,
      data
    );

    return c.json(enrollment, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
