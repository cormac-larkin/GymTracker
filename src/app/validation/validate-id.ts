import { ValidationError } from "../errors/validation-error";

function validateId(id: number) {
  if (isNaN(id) || id < 1) {
    throw new ValidationError("Resource ID must be a positive number");
  }
}

export default validateId;
