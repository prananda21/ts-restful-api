import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { AddressController } from "../controller/address-controller";

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

// address API
APIRouter.post(
	"/api/contacts/:contactId(\\d+)/addresses",
	AddressController.create
);
APIRouter.get(
	"/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)",
	AddressController.get
);
APIRouter.put(
	"/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)",
	AddressController.update
);
APIRouter.delete(
	"/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)",
	AddressController.remove
);
APIRouter.get(
	"/api/contacts/:contactId(\\d+)/addresses",
	AddressController.list
);
