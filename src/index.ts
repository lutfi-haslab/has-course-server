import './shared/config/sentry/instrument';
import app from './api/routes';


export default {
    port: 3001,
    fetch: app.fetch,
}
