import { Context } from "hono";
import { SectionSchema } from "../../../../entities/models/course.model";
import { SectionsService } from "../../../../services/course.section.service";
import { HonoVariables } from "../../../../shared/types";

export const updateSectionHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const data = SectionSchema.partial().parse(await c.req.json());
    const section = await SectionsService(c).updateSection(id, data);

    return c.json(section, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
