import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { APIRouter } from "../router/api";
export const web = express();

web.use(express.json());

web.use(publicRouter);
web.use(APIRouter);

web.use(errorMiddleware);
