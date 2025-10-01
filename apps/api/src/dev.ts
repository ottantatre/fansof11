import 'dotenv/config';
import { serve } from '@hono/node-server';
import app from './index';

const port = Number(process.env.PORT || 4001);
serve({ fetch: app.fetch, port }, () =>
  console.info(
    `[api] http://localhost:${port}  (env: ${process.env.NODE_ENV || 'dev'})`
  )
);
