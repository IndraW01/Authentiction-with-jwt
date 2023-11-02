import express from "express";
import userController from "../controller/user-controller.js";

export const publicApi = express.Router();

publicApi.post('/users/register', userController.register);
publicApi.post('/users/login', userController.login);

publicApi.get('/refresh', userController.refresh);
