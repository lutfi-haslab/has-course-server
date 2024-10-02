import { Context } from "hono";
import { SectionsService } from "../../../../services/course.section.service";
import { HonoVariables } from "../../../../shared/types";

export const getSectionHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const id = c.req.param("id");
    const section = await SectionsService(c).getSection(id);

    return c.json(section, 200);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};
