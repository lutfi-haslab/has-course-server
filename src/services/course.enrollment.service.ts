import { z } from "@hono/zod-openapi";
import { startSpan } from "@sentry/bun";
import { Context } from "hono";
import { CourseEnrollmentSchema } from "../entities/models/course.model";
import { HonoVariables } from "../shared/types";

export const CourseEnrollmentsService = (
  c: Context<{ Variables: HonoVariables }>
) => {
  const client = c.get("supabaseClient");
  const parentSpan = c.get("parentSpan");

  const createCourseEnrollment = async (
    data: z.infer<typeof CourseEnrollmentSchema>
  ) => {
    return startSpan(
      {
        op: "db.query",
        name: "CourseEnrollmentsService > createCourseEnrollment",
        parentSpan,
      },
      async () => {
        const response = await client
          .from("course_enrollments")
          .insert(data)
          .single();
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      }
    );
  };

  const getCourseEnrollment = async (id: string) => {
    return startSpan(
      {
        op: "db.query",
        name: "CourseEnrollmentsService > getCourseEnrollment",
        parentSpan,
      },
      async () => {
        const response = await client
          .from("course_enrollments")
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

  const updateCourseEnrollment = async (
    id: string,
    data: Partial<z.infer<typeof CourseEnrollmentSchema>>
  ) => {
    return startSpan(
      {
        op: "db.query",
        name: "CourseEnrollmentsService > updateCourseEnrollment",
        parentSpan,
      },
      async () => {
        const response = await client
          .from("course_enrollments")
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
    createCourseEnrollment,
    getCourseEnrollment,
    updateCourseEnrollment,
  };
};
