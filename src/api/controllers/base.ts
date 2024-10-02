import { Context } from "hono";
import { AuthUserSchema } from "../../entities/models/auth";
import { ResponseSchema, BaseResponseSchema } from "../../entities/models/response";
import { HonoVariables } from "../../shared/types";


export const getUsersHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    // Logic

    const response = {
      code: 200,
      status: "success",
      data: "",
      messages: "User registered successfully",
    };

    // Validate the response
    const parsedResponse = ResponseSchema(AuthUserSchema).parse(response);

    // Pass the status code as part of the ResponseInit object
    return c.json(parsedResponse, 200);
  } catch (error) {
    // Logic Here
    const errorResponse = {
      code: 400,
      status: "error",
      messages: "Invalid input data",
    };
    const parsedErrorResponse = BaseResponseSchema.parse(errorResponse);
    return c.json(parsedErrorResponse, 400);
  }
};
