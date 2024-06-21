export type ApiErrorTypes = "validation_error";

type CommonError = {
  status: number;
  message?: string;
  errors?: unknown;
  type?: ApiErrorTypes;
};

export type ValidationError = CommonError & {
  type: "validation_error";
  errors: Array<{
    property: string;
    constraints: Record<string, string>;
  }>;
};

export type ServerError = { error: CommonError | ValidationError };
