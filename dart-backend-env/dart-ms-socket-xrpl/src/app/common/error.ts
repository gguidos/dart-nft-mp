export enum StatusCodes {
    NotFound = 404,
    UnAuthorize = 401,
    Forbidden = 403,
    BadRequest = 400,
    ServiceUnavailable = 503,
    ServerError = 500
  }
  
  export class AppError extends Error {
    constructor(message: string, public statusCode: StatusCodes) {
      super(message);
      this.message = message;
    }
  }