import Joi from "joi"

export const userRegisterValidation = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(200).email().required(),
  password: Joi.string().min(3).max(200).required(),
});

export const userLoginValidation = Joi.object({
  email: Joi.string().max(200).email().required(),
  password: Joi.string().min(3).max(200).required(),
});

export const userGetValidation = Joi.string().max(200).email().required();