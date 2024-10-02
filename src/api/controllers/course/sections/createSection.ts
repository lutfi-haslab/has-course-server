import { Context } from "hono";
import { SectionSchema } from "../../../../entities/models/course.model";
import { SectionsService } from "../../../../services/course.section.service";
import { HonoVariables } from "../../../../shared/types";
import { ResponseSchema, BaseResponseSchema } from "../../../../entities/models/response.model";


export const createSectionHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const data = SectionSchema.parse(await c.req.json());
    const section = await SectionsService(c).createSection(data);
    const response = {
      code: 201,
      status: "success",
      data: data,
      messages: "Course created successfully",
    };
    const parsedResponse = ResponseSchema(SectionSchema).parse(response);

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