import { Context } from "hono";
import { AuthService } from "../../../services/auth.service";
import { HonoVariables } from "../../../shared/types";
import { AuthUserSchema } from "../../../entities/models/auth.model";
import { ResponseSchema, BaseResponseSchema } from "../../../entities/models/response.model";

export const signInHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const { email, password } = await c.req.json();

    // Assuming AuthService(c).registerUser returns a user object that matches AuthUserSchema
    const user = await AuthService(c).loginUser(email, password);

    const response = {
      code: 200,
      status: "success",
      data: user,
      messages: "User registered successfully",
    };

    // Validate the response
    const parsedResponse = ResponseSchema(AuthUserSchema).parse(response);

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
