import { captureException } from '@sentry/bun';
import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { HonoVariables } from '../../shared/types';
export const errorHandler = (err: Error, c: Context<{ Variables: HonoVariables }, any, {}>) => {
    captureException(err);
    if (err instanceof HTTPException) {
        return err.getResponse();
    }

    return c.json({
        error: err.message,
    }, 500);
}