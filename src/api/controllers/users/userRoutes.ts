import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HonoVariables } from "../../../shared/types";
import { getUsersHandler } from "./getUsers";
import { UserSchema } from "../../../entities/models/user";


// const app = new Hono()
//   .get("/", getUsersHandler);

const app = new OpenAPIHono<{ Variables: HonoVariables }>()




app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.array(UserSchema)
          }
        }
      }
    }
  }),
  getUsersHandler
)


export default app;