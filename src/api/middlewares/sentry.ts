import { startSpan } from '@sentry/bun';
import { Context, Next } from 'hono';
import { HonoVariables } from '../../shared/types';

export const sentryMiddleware = async (c: Context<{Variables: HonoVariables}, "/api/*", {}>, next: Next) => {
    if (c.req.method === 'OPTIONS') {
        return next(); // Skip pre-flight requests
    }

    return startSpan(
        {
            name: `${c.req.method} ${c.req.path}`,
            op: "http.server",
        },
        async (span) => {
            c.set('parentSpan', span);
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
};
