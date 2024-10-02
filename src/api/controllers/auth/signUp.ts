import { Context } from "hono";
import {
  AuthServiceError,
  AuthUserSchema,
} from "../../../entities/models/auth.model";
import {
  BaseResponseSchema,
  ResponseSchema,
} from "../../../entities/models/response.model";
import { AuthService } from "../../../services/auth.service";
import { HonoVariables } from "../../../shared/types";

export const signUpHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const { email, password, confirmPassword } = await c.req.json();
    if (password !== confirmPassword) {
      throw new AuthServiceError("Passwords do not match", 400);
    }

    const user = await AuthService(c).registerUser(email, password);

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
      messages: error?.message || "Invalid input data",
    };
    const parsedErrorResponse = BaseResponseSchema.parse(errorResponse);
    return c.json(parsedErrorResponse, 400);
  }
};
