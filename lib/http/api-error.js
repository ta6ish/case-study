'use strict';

class ApiError extends Error {
  constructor(message, code, httpStatusCode = 500) {
    super(message);
    this.code = code;
    this.name = 'ApiError';
    this.httpStatusCode = httpStatusCode;
  }

  response() {
    return {
      code: this.code,
      msg: this.message,
    }
  }
}

module.exports = {
  ApiError,
}