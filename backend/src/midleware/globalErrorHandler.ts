/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  const success = false;
  let message = "Something went wrong!";
  let errorCode = "INTERNAL_ERROR";
  let errorDetails: any = null;

  // Custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorCode = err.code ?? errorCode;
    message = err.message;
    errorDetails = err.errorMessage;
  }
  // Zod Validation Error
  else if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorCode = "VALIDATION_ERROR";
    message = "Validation Error";
    errorDetails = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Default Error
  else if (err instanceof Error) {
    message = err.message || message;
  }

  // Final Response (2025 Standard)
  res.status(statusCode).json({
    success,
    message,
    errorCode,
    errorDetails,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default globalErrorHandler;
