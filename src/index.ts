import { config } from '@/src/env';
import express from 'express';

const app = express();
const port = config.server.port;
app.listen(port, () => {
  console.log(`Listen on: http://localhost:${port}`);
});
