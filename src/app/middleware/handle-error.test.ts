import { Request, Response } from "express";
import { handleError } from "./handle-error";
import { NextFunction } from "express-serve-static-core";

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
    sendStatus: jest.fn(),
  } as unknown as Response;

  err = new Error("Error message");

  next = jest.fn();
});

describe("handle-error middleware", () => {
  it("should log the correct error message and call sendStatus(500)", () => {
    req.originalUrl = "/test";

    handleError(err, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `*** The following error occurred during a call to the '/test' endpoint ***`
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(err);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
