import { z } from "@hono/zod-openapi";
import { startSpan } from "@sentry/bun";
import { Context } from "hono";
import { HonoVariables } from "../shared/types";
import { CourseSchema } from "../entities/models/course.model";

export const CoursesService = (c: Context<{ Variables: HonoVariables }>) => {
    const client = c.get("supabaseClient");
    const parentSpan = c.get("parentSpan");
  
    const createCourse = async (data: z.infer<typeof CourseSchema>) => {
      return startSpan(
        {
          op: "db.query",
          name: "CoursesService > createCourse",
          parentSpan,
        },
        async () => {
          const response = await client.from("courses").insert(data).single();
          console.log("response", response);
          if (response.error) {
            throw new Error(response.error.message);
          }
          return response;
        }
      );
    };
  
    const getCourses = async (
      page: number = 1,
      limit: number = 3
    ): Promise<{
      data: z.infer<typeof CourseSchema>[];
      count: number | null;
    }> => {
      return startSpan(
        {
          op: "db.query",
          name: "CoursesService > getCourse",
          parentSpan,
        },
        async () => {
          const offset = (page - 1) * limit;
          const to = offset + limit - 1;
          console.log("offset", offset);
          console.log("to", to);
  
          const response = await client
            ?.from("courses")
            .select("*", {count: 'exact'}).range(offset, to);
  
          if (response?.error) {
            // Handle the error, e.g., throw it or log it
            throw new Error(response.error.message);
          }
          // Ensure that `data` is present and is of the expected type
          return {
            data: response.data,
            count: response.count,
          };
        }
      );
    };
  
    const getCourse = async (id: string) => {
      return startSpan(
        {
          op: "db.query",
          name: "CoursesService > getCourse",
          parentSpan,
        },
        async () => {
          const response = await client
            .from("courses")
            .select("*")
            .eq("id", id)
            .single();
          if (response.error) {
            throw new Error(response.error.message);
          }
          return response.data;
        }
      );
    };
  
    const updateCourse = async (
      id: string,
      data: Partial<z.infer<typeof CourseSchema>>
    ) => {
      return startSpan(
        {
          op: "db.query",
          name: "CoursesService > updateCourse",
          parentSpan,
        },
        async () => {
          const response = await client
            .from("courses")
            .update(data)
            .eq("id", id)
            .single();
          if (response.error) {
            throw new Error(response.error.message);
          }
          return response.data;
        }
      );
    };
  
    return {
      createCourse,
      getCourse,
      getCourses,
      updateCourse,
    };
  };