/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../utils/ApiError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: { path: string | number; message: string }[] = [];

  try {
    // ✅ Handle custom ApiError
    if (err instanceof ApiError) {
      statusCode = err.statusCode || 500;
      message = err.message || "API Error";
      errorMessages = [{ path: "", message }];
    }

    // ✅ Handle real ZodError
    else if (err instanceof ZodError) {
      statusCode = 400;
      message = "Validation Error";
      errorMessages = err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
    }

    // ✅ Handle case where ZodError is stringified JSON (like your example)
    else if (
      typeof err.message === "string" &&
      err.message.includes('"code": "invalid_value"')
    ) {
      try {
        const parsed = JSON.parse(err.message);
        if (Array.isArray(parsed)) {
          errorMessages = parsed.map((e) => ({
            path: e.path?.join?.(".") || e.path || "",
            message: e.message || "Invalid value",
          }));
          message = "Validation Error";
          statusCode = 400;
        }
      } catch {
        message = err.message;
      }
    }

    // ✅ Fallback for built-in Error
    else if (err instanceof Error) {
      message = err.message;
      errorMessages = [{ path: "", message: err.message }];
    }

    // ✅ Generic unknown
    else {
      message = String(err);
      errorMessages = [{ path: "", message }];
    }
  } catch (nestedError) {
    // Safety net for unexpected edge cases
    message = "Internal error while formatting error response";
    errorMessages = [{ path: "", message: String(nestedError) }];
  }

  // ✅ Final response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
