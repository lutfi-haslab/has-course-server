import { Context } from 'hono';

export const healthHandler = async (c: Context) => {
  return c.text('OK');
};