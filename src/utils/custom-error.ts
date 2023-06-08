export default class CustomError extends Error {
  status: number;
  constructor(message: string, statusCode: number, name: string) {
    super(message);
    this.name = name;
    this.status = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

