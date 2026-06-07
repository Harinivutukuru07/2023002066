import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const message = error instanceof Error ? error.message : "Internal Server Error";
  const statusCode =
    message.includes("Bearer token") || message.includes("Authorization header")
      ? 401
      : 500;

  res.status(statusCode).json({
    message,
  });
}