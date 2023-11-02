export class ResponseError extends Error {
  code;
  status;

  constructor(code, status, message) {
    super(message);

    this.code = code;
    this.status = status;
  }
}