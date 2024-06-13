import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";

export const APIRouter = express.Router();
APIRouter.use(authMiddleware);

// user API

APIRouter.get("/api/users/current", UserController.get);
APIRouter.patch("/api/users/current", UserController.update);
APIRouter.delete("/api/users/current", UserController.logout);

// contact API
APIRouter.post("/api/contacts", ContactController.create);
APIRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get);
APIRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update);
APIRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.remove);
APIRouter.get("/api/contacts", ContactController.search);
