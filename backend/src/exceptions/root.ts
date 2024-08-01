export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    error: any,
  ) {
    super(message);

    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USERNAME_NOT_FOUND = 1001,
  EMAIL_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  USERNAME_ALREADY_EXISTS = 1004,
  UNPROCESSIBLE_ENTITY = 2001,
  INTERNAL_SERVER_ERROR = 3001,
  UNAUTHORIZED_ACCESS = 4001,
  EMPLOYEE_NOT_FOUND = 5001,
}
