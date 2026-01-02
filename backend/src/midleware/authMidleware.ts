/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { jwtHelpers } from "./jwtHelper";
import config from "../config";
import { errorLogger } from "../logger/logger";

// Type for JWT payload
interface IJwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extended Request type
interface AuthRequest extends Request {
  user: IJwtPayload;
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from header
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "MISSING_TOKEN",
          "Access token is required"
        );
      }

      const token = authHeader.split(" ")[1];

      // 2. Verify token
      let verifiedUser: IJwtPayload | null = null;

      try {
        verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt_secret as string
        ) as IJwtPayload;
      } catch (error: any) {
        if (error.name === "TokenExpiredError") {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "TOKEN_EXPIRED",
            "Token has expired. Please login again."
          );
        }
        if (error.name === "JsonWebTokenError") {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "INVALID_TOKEN",
            "Invalid token provided"
          );
        }

        errorLogger.error("JWT Verification Error:", error);
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "INVALID_TOKEN",
          "Invalid or malformed token"
        );
      }

      // 3. Token verified, attach user to request
      (req as AuthRequest).user = verifiedUser;

      // 4. Role-based access control
      if (requiredRoles.length > 0) {
        if (!verifiedUser.role || !requiredRoles.includes(verifiedUser.role)) {
          throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "FORBIDDEN_ACCESS",
            "You do not have permission to access this resource"
          );
        }
      }

      // All good → go next
      next();
    } catch (error: any) {
      // Let global error handler handle it
      next(error);
    }
  };

export default auth;
