import { Context } from "hono";
import { LessonsService } from "../../../../../services/course.lesson.service";
import { HonoVariables } from "../../../../../shared/types";

export const getLessonHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const lesson = await LessonsService(c).getLesson(id);

    return c.json(lesson, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
