import { Context } from "hono";
import { LessonSchema } from "../../../../../entities/models/course.model";
import { LessonsService } from "../../../../../services/course.lesson.service";
import { HonoVariables } from "../../../../../shared/types";

export const updateLessonHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const data = LessonSchema.partial().parse(await c.req.json());
    const lesson = await LessonsService(c).updateLesson(id, data);

    return c.json(lesson, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
