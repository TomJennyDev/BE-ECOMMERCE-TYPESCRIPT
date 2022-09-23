import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

interface IResponse {
  success?: boolean;
  data?: any;
  errors?: any;
  message?: string;
}

// This function controls the way we response to the client
// If we need to change the way to response later on, we only need to handle it here
export function sendResponse(
  res: Response,
  status: number,
  success?: boolean,
  data?: any,
  errors?: any,
  message?: string
) {
  const response: IResponse = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (message) response.message = message;
  return res.status(status).json(response);
}

export function generateRandomHexString(len: number) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
}
// Error handling //try-catch eliminate // catch async
export function catchAsync(
  func: (req: Request, res: Response, next: NextFunction) => void
) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
}

export class AppError extends Error {
  statusCode: number;
  errorType: string;
  isOperational: boolean;
  constructor(statusCode: number, message: string, errorType: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    // all errors using this class are operational errors.
    this.isOperational = true;
    // create a stack trace for debugging (Error obj, void obj to avoid stack polution)
    Error.captureStackTrace(this, this.constructor);
  }
}
