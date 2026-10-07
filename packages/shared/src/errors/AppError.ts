class AppError extends Error {
  statusCode: number;
  code: string;
  details?: string;
  constructor(message: string, statusCode: number, code: string, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
  }
}
// invalid req ( authorization header missing, accesstoken missing/expire, wronge credientials)
class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', details?: string) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}
// server ko requested resource mil hi nhi rha, GET /users/12345 -> DB: User 12345 X - (tum jis cheez ko maang rahe ho wo db mein exist nahi kerti)
class NotFoundError extends AppError {
  constructor(message: string = 'Not Found', details?: string) {
    super(message, 404, 'NOT_FOUND', details);
  }
}
// invalid request, (malformed req, invalid parameter, invalid query, info missing, format wrong)
class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', details?: string) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}
// authenticated but not authorized, access -> users endpoint, but not -> admin endpoint
class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden Request', details?: string) {
    super(message, 403, 'FORBIDDEN_REQUEST', details);
  }
}

// request valid hai but current state ke sath conflict ker rahi he, (email already exists, username already exists, duplicate resource, order already cancled)
class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists', details?: string) {
    super(message, 409, 'CONFLICT_ERROR', details);
  }
}
// request structurally samajh aa gayi, but data/business meaning acceptable nahi, - ("email": abs@example.com, "age": -5)
class UnprocessableEntityError extends AppError {
  constructor(message: string = 'Unprocessable Entity Error', details?: string) {
    super(message, 422, 'UNPROCESSABLE_ENTITY_ERROR', details);
  }
}
// rate limit se zyada request ker di user ne
class TooManyRequestError extends AppError {
  constructor(message: string = 'Too Many Request Error', details?: string) {
    super(message, 429, 'TOO_MANY_REQUEST_ERROR', details);
  }
}
// server ke ander unexpected problem ho gayi.
class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error', details?: string) {
    super(message, 500, 'INTERNAL_SERVER_ERROR', details);
  }
}

export {
  AppError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  TooManyRequestError,
  UnauthorizedError,
  UnprocessableEntityError,
};
