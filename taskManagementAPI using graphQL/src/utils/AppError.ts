export type AppErrorType = Error & {
  statusCode: number;
  success: boolean;
};

export const createError = (
  message: string,
  statusCode: number
): AppErrorType => {
  const err = new Error(message) as AppErrorType;
  err.statusCode = statusCode;
  err.success = false;
  return err;
};
