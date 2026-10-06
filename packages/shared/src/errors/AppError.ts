class AppError extends Error {
  statusCode: number;
  code: string;
  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
// invalid req ( authorization header missing, accesstoken missing/expire, wronge credientials)
export class Unauthorized extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}
// server ko requested resource mil hi nhi rha, GET /users/12345 -> DB: User 12345 X - (tum jis cheez ko maang rahe ho wo db mein exist nahi kerti)
export class NotFoundError extends AppError {
  constructor(message: string = 'Not Found') {
    super(message, 404, 'NOT_FOUND');
  }
}
// invalid request, (malformed req, invalid parameter, invalid query, info missing, format wrong)
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request') {
    super(message, 400, 'BAD_REQUEST');
  }
}
// authenticated but not authorized, access -> users endpoint, but not -> admin endpoint
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden Request') {
    super(message, 403, 'FORBIDDEN_REQUEST');
  }
}

// request valid hai but current state ke sath conflict ker rahi he, (email already exists, username already exists, duplicate resource, order already cancled)
export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409, 'CONFLICT_ERROR');
  }
}
// request structurally samajh aa gayi, but data/business meaning acceptable nahi, - ("email": abs@example.com, "age": -5)
export class UnprocessableEntityError extends AppError {
  constructor(message: string = 'Unprocessable Entity Error') {
    super(message, 422, 'UNPROCESSABLE_ENTITY_ERROR');
  }
}
// rate limit se zyada request ker di user ne
export class TooManyRequestError extends AppError {
  constructor(message: string = 'Too Many Request Error') {
    super(message, 429, 'TOO_MANY_REQUEST_ERROR');
  }
}
// server ke ander unexpected problem ho gayi.
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}
