class ApiError extends Error {
  statusCode: number;
  code?: string;
  isOperational: boolean;
  errorMessage: string;

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = errorCode;
    this.isOperational = true;
    this.errorMessage = message;
    Error.captureStackTrace(this, this.constructor);
  }

  // Custom toJSON method to format the error response
  toJSON() {
    return {
      statusCode: this.statusCode,
      code: this.code,
      errorMessage: this.errorMessage,
      stack: this.stack,
    };
  }
}

export default ApiError;
