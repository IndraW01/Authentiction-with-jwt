import jwt from "jsonwebtoken";
import Joi from "joi";
import { ResponseError } from "../error/response-error.js";

const { JsonWebTokenError, TokenExpiredError } = jwt;
const { ValidationError } = Joi

export const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.code).json({
      code: err.code,
      status: err.status,
      errors: err.message
    })
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      code: 400,
      status: 'Bad Request',
      errors: err.message
    })
  } else if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    res.status(401).json({
      code: 401,
      status: 'Unauthorized',
      errors: err.message
    })
  } else {
    res.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      errors: err.message
    })
  }
}