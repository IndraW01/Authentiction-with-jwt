import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { publicApi } from "../routes/public-api.js";
import { authApi } from "../routes/auth-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import dotenv from "dotenv";

dotenv.config()

export const web = express();

web.use(cors())
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(cookieParser());

web.use('/api', publicApi);
web.use('/api', authApi);

web.use(errorMiddleware);