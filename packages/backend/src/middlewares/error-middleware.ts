import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-errors.js";

export function errorMiddleware(
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`Error: ${e.message}`);
  if (e instanceof ApiError) {
    return res.status(e.error.status).json(e);
  }
  return res.status(500).json({ message: "Something went wrong :(" });
}
