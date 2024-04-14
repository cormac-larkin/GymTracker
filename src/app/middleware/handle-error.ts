import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express-serve-static-core";
import { RestError } from "../errors/rest-error";

export const handleError: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `*** The following error occurred during a call to the '${req.originalUrl}' endpoint ***`
  );
  console.error(err);

  if (err instanceof RestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Handle errors from bodyParser
  if (err.statusCode) {
    return res.sendStatus(err.statusCode);
  }

  return res.sendStatus(500);
};
