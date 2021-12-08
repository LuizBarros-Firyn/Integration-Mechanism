import { Request, Response, NextFunction } from 'express';

const RequestLogService = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  // eslint-disable-next-line
  console.time(logLabel);

  next();
  // eslint-disable-next-line
  console.timeEnd(logLabel);

  // eslint-disable-next-line
  console.log('============================================================');
};

export default RequestLogService;
