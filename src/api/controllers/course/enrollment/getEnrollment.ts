import { Context } from "hono";
import { CourseEnrollmentsService } from "../../../../services/course.enrollment.service";
import { HonoVariables } from "../../../../shared/types";

export const getCourseEnrollmentHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const enrollment = await CourseEnrollmentsService(c).getCourseEnrollment(
      id
    );

    return c.json(enrollment, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
