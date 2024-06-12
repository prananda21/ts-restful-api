import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const APIRouter = express.Router();
APIRouter.use(authMiddleware);

// user API

APIRouter.get("/api/users/current", UserController.get);
APIRouter.patch("/api/users/current", UserController.update);
APIRouter.delete("/api/users/current", UserController.logout);
