import { Context } from "hono";
import { SessionAuthUserSchema } from "../../../entities/models/auth.model";
import { BaseResponseSchema, ResponseSchema } from "../../../entities/models/response.model";
import { UsersService } from "../../../services/users.service";
import { HonoVariables } from "../../../shared/types";

export const getCurrentUserHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  console.log(c.get("user"));
  try {
    const user = await UsersService(c).getCurrentUser();

    const response = {
      code: 200,
      status: "success",
      data: user,
      messages: "User registered successfully",
    };

    // Validate the response
    const parsedResponse = ResponseSchema(SessionAuthUserSchema).parse(response);

    // Pass the status code as part of the ResponseInit object
    return c.json(parsedResponse, 200);
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
