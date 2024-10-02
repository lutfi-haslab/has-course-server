import { z } from "@hono/zod-openapi";
import { startSpan } from "@sentry/bun";
import { Context } from "hono";
import { SectionSchema } from "../entities/models/course.model";
import { HonoVariables } from "../shared/types";

export const SectionsService = (c: Context<{ Variables: HonoVariables }>) => {
  const client = c.get("supabaseClient");
  const parentSpan = c.get("parentSpan");

  const createSection = async (data: z.infer<typeof SectionSchema>) => {
    return startSpan(
      {
        op: "db.query",
        name: "SectionsService > createSection",
        parentSpan,
      },
      async () => {
        const response = await client.from("sections").insert(data).single();
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      }
    );
  };

  const getSection = async (id: string) => {
    return startSpan(
      {
        op: "db.query",
        name: "SectionsService > getSection",
        parentSpan,
      },
      async () => {
        const response = await client
          .from("sections")
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

  const updateSection = async (
    id: string,
    data: Partial<z.infer<typeof SectionSchema>>
  ) => {
    return startSpan(
      {
        op: "db.query",
        name: "SectionsService > updateSection",
        parentSpan,
      },
      async () => {
        const response = await client
          .from("sections")
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
    createSection,
    getSection,
    updateSection,
  };
};
