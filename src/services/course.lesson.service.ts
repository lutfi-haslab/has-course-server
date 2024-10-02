import { z } from "@hono/zod-openapi";
import { startSpan } from "@sentry/bun";
import { Context } from "hono";
import { LessonSchema } from "../entities/models/course.model";
import { HonoVariables } from "../shared/types";

export const LessonsService = (c: Context<{ Variables: HonoVariables }>) => {
    const client = c.get("supabaseClient");
    const parentSpan = c.get("parentSpan");
  
    const createLesson = async (data: z.infer<typeof LessonSchema>) => {
      return startSpan(
        {
          op: "db.query",
          name: "LessonsService > createLesson",
          parentSpan,
        },
        async () => {
          const response = await client.from("lessons").insert(data).single();
          if (response.error) {
            throw new Error(response.error.message);
          }
          return response.data;
        }
      );
    };
  
    const getLesson = async (id: string) => {
      return startSpan(
        {
          op: "db.query",
          name: "LessonsService > getLesson",
          parentSpan,
        },
        async () => {
          const response = await client
            .from("lessons")
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
  
    const updateLesson = async (
      id: string,
      data: Partial<z.infer<typeof LessonSchema>>
    ) => {
      return startSpan(
        {
          op: "db.query",
          name: "LessonsService > updateLesson",
          parentSpan,
        },
        async () => {
          const response = await client
            .from("lessons")
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
      createLesson,
      getLesson,
      updateLesson,
    };
  };