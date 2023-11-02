import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

export const authApi = express.Router();

authApi.use(authMiddleware);

authApi.get('/users/current', userController.current);
authApi.delete('/users/logout', userController.logout);
