import { z } from "@hono/zod-openapi";

export const BaseResponseSchema = z.object({
  code: z.number(),
  status: z.string(),
  messages: z.string(),
});

// export const ResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
//   return z.object({
//     ...BaseResponseSchema,
//     data: dataSchema,
//   });
// };

export const ResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.number(),
    status: z.string(),
    data: dataSchema,
    messages: z.string(),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
    }).optional(),
  });
