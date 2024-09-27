import { Context } from 'hono';
import { HonoVariables } from '../shared/types';
import { startSpan } from '@sentry/bun';
import { UserSchema } from '../entities/models/user';
import { z } from '@hono/zod-openapi';

export const UsersService = (c: Context<{ Variables: HonoVariables }>) => {
  const client = c.get('supabaseClient');
  const parentSpan = c.get('parentSpan');

  const getUsers = async (): Promise<z.infer<typeof UserSchema>[]> => {
    return startSpan({
      op: 'db.query',
      name: 'UsersService > getUsers',
      parentSpan
    }, async () => {
      const response = await client?.from('users').select();

      if (response?.error) {
        // Handle the error, e.g., throw it or log it
        throw new Error(response.error.message);
      }

      // Ensure that `data` is present and is of the expected type
      return response?.data || [];
    });
  };

  return {
    getUsers,
  };
};
