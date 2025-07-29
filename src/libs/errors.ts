import { Error, ValidationErrorItem } from "sequelize";

class CustomError extends Error {
  public path: string;
  constructor(message: string, path?: string) {
    super(message);
    this.path = path;
  }
}

export const FailValidation = (errors: ValidationErrorItem[]) => {
  const messages: any = {};
  errors.forEach((error) => {
    const origin = error.origin as unknown;
    const customOrigin = origin as CustomError;

    const path = customOrigin?.path || error.path;
    const message = customOrigin?.message || error.message;

    messages[path] ||= [];
    messages[path].push(message);
  });
  return {
    code: 120,
    messages,
  };
};

export const NoData = {
  code: 8,
  message: "No data available",
};

export const InternalError = {
  code: 131,
  message: "Internal error",
};

export const BadAuthentication = {
  code: 215,
  message: "Bad authentication data",
};

export const MemberNotFound = {
  code: 301,
  message: "Entered member code is invalid",
};
