import { Context } from "hono";
import { UsersService } from "../../../services/users.service";
import { HonoVariables } from "../../../shared/types";
import { AuthUserSchema } from "../../../entities/models/auth.model";
import {
  BaseResponseSchema,
  ResponseSchema,
} from "../../../entities/models/response.model";
import { UserSchema } from "../../../entities/models/user.model";
import { z } from "@hono/zod-openapi";

export const getUsersHandler = async (
  c: Context<{ Variables: HonoVariables }>
) => {
  try {
    const { page, limit } = c.req.query();
    const {data: user, count} = await UsersService(c).getUsers(Number(page), Number(limit));


    const response = {
      code: 200,
      status: "success",
      data: user,
      messages: "User registered successfully",
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(count),
      }
    };

    // Validate the response
    const parsedResponse = ResponseSchema(z.array(UserSchema)).parse(response);

    // Pass the status code as part of the ResponseInit object
    return c.json(parsedResponse, 200);
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
