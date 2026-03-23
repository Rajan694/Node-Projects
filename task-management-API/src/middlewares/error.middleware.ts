import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err);
  res.status(statusCode).json({
    success: err.success ?? false,
    message,
    // Add stack trace only in development if needed
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
