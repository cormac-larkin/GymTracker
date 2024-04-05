import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express-serve-static-core";

export const handleError: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `*** The following error occurred during a call to the '${req.originalUrl}' endpoint ***`
  );
  console.error(err);
  return res.sendStatus(500);
};
