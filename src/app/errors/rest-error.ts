abstract class RestError extends Error {
  abstract readonly statusCode: number;
}

export { RestError };
