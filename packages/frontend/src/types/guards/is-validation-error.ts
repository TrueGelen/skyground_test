import { ServerError, ValidationError } from "../server-error";

export function isValidationError(
  error?: ServerError["error"]
): error is ValidationError {
  return error?.type === "validation_error";
}
