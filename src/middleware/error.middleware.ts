import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/exceptions/http.exception";

export function ErrorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  res.status(statusCode).send({
    statusCode,
    message,
  });
}
