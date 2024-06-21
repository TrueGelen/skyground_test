import { ValidationError } from "class-validator";

export type ApiErrorTypes = "validation_error";

type ErrorParams = {
  status: number;
  message?: string;
  errors?: unknown;
  type?: ApiErrorTypes;
};

interface KnownErrors {
  error: ErrorParams;
}

export class ApiError extends Error implements KnownErrors {
  error: ErrorParams;

  constructor(error: ErrorParams) {
    super(error.message);
    this.error = error;
  }

  static UnauthorizedError() {
    return new ApiError({ status: 401, message: "The user is not logged in" });
  }

  static BadRequest({
    message,
    errors,
  }: Partial<Pick<ErrorParams, "message" | "errors">>) {
    return new ApiError({ status: 400, message, errors });
  }

  static ValidationError({
    message = "Invalid data",
    errors = [],
  }: Partial<Pick<ErrorParams, "message">> & { errors: ValidationError[] }) {
    return new ApiError({
      status: 422,
      type: "validation_error",
      message,
      errors,
    });
  }
}
