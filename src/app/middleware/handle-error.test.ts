import { Request, Response } from "express";
import { handleError } from "./handle-error";
import { NextFunction } from "express-serve-static-core";
import { ValidationError } from "../errors/validation-error";
import { NotFoundError } from "../errors/not-found-error";

const consoleErrorSpy = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

let req: Request;
let res: Response;
let err: Error;
let next: NextFunction;

beforeAll(() => {
  req = { originalUrl: "" } as unknown as Request;
  res = {
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  next = jest.fn();
});

describe("handle-error middleware", () => {
  it("should log the correct error message and call sendStatus(500) for a generic error", () => {
    req.originalUrl = "/test";
    err = new Error("Error message");

    handleError(err, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `*** The following error occurred during a call to the '/test' endpoint ***`
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(err);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });

  it("should log the correct error message and construct response with 400 status code for a validation error", () => {
    req.originalUrl = "/test";
    err = new ValidationError("Invalid data provided");

    handleError(err, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `*** The following error occurred during a call to the '/test' endpoint ***`
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(err);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid data provided" });
  });

  it("should log the correct error message and construct response with 400 status code for a not-found error", () => {
    req.originalUrl = "/test";
    err = new NotFoundError("Resource not found");

    handleError(err, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `*** The following error occurred during a call to the '/test' endpoint ***`
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(err);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Resource not found" });
  });
});
