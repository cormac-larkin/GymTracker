import { RestError } from "./rest-error";

class ValidationError extends RestError {
  statusCode = 400;
}

export { ValidationError };
