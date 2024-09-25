import { Hono } from 'hono'
import { handle } from 'hono/vercel'



const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" })
})

app.get('/hello', (c) => {
  try {
    throw new Error("API throw error test");
  } catch (error) {
    return c.json({ message: "API throw error test" });
  }
})

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;

export default {
  port: 3000,
  fetch: app.fetch,
}