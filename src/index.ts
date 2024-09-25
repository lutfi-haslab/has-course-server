import './core/sentry/instrument';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import * as Sentry from '@sentry/bun';

const app = new Hono().basePath('/api');

// Middleware for Sentry tracing
app.use('*', async (c, next) => {
    return Sentry.startSpan(
        {
            name: `${c.req.method} ${c.req.path}`,
            op: "http.server",
        },
        async (span) => {
            try {
                // Call the next middleware or route handler
                await next();
            } finally {
                // Finish the span
                span.end();
            }
            return c.res;
        }
    );
});

app.get('/', (c) => {
    Sentry.captureMessage("Congrats! You've deployed Hono to Render");
    return c.json({ message: "Congrats! You've deployed Hono to Vercel" })
});

app.get('/hello', (c) => {
    try {
        throw new Error("API throw error test");
    } catch (error) {
        Sentry.captureException(error);
        return c.json({ message: "API throw error test" });
    }
});

app.onError((err, c) => {
    Sentry.captureException(err);
    if (err instanceof HTTPException) {
        return err.getResponse();
    }

    return c.json({
        error: err.message,
    }, 500);
});

export default {
    port: 3000,
    fetch: app.fetch,
}