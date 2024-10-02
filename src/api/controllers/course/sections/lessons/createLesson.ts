import { Context } from "hono";
import { LessonSchema } from "../../../../../entities/models/course.model";
import { LessonsService } from "../../../../../services/course.lesson.service";
import { HonoVariables } from "../../../../../shared/types";

export const createLessonHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const data = LessonSchema.parse(await c.req.json());
    const lesson = await LessonsService(c).createLesson(data);

    return c.json(lesson, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
