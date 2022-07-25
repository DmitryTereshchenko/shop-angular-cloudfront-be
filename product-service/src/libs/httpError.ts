export enum HttpStatus {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  INVALID_BODY = 400,
  SUCCESS = 200
}
export class HttpError extends Error {
  constructor(public readonly statusCode: HttpStatus, message: string) {
    super(message);
  }
}