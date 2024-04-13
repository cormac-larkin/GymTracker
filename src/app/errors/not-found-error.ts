import { RestError } from "./rest-error";

class NotFoundError extends RestError {
  statusCode = 404;
}

export { NotFoundError };
