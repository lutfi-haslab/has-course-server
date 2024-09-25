import { Hono } from 'hono'

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

export default {
  port: 3000,
  fetch: app.fetch,
}