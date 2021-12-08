import * as dotenv from 'dotenv';

import cors from 'cors';

import express from 'express';
import routes from './routes/index';
import RequestLogService from './services/RequestLogService';

import ExecutionService from './services/ExecutionService';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(RequestLogService);

app.use(routes);

app.listen(process.env.SYSTEM_PORT || 3333, () => {
  ExecutionService();

  // eslint-disable-next-line no-console
  console.log(
    `Integration Mechanism - Up and running on port ${
      process.env.SYSTEM_PORT || 3333
    }`
  );
});
