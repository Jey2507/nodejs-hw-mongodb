import express from "express";
import { addContactController, deleteContactByIdController, getAllContactsControllers, getContactByIdController, patchContactController } from "../controllers/contacts.js";
import isValidId from "../middlewares/isValid.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactRouter = express.Router();

contactRouter.get("/", ctrlWrapper(getAllContactsControllers))

contactRouter.get("/:id", isValidId, ctrlWrapper(getContactByIdController))

contactRouter.post("/", ctrlWrapper(addContactController))

contactRouter.patch("/:id", isValidId, ctrlWrapper(patchContactController))

contactRouter.delete("/:id",isValidId, ctrlWrapper(deleteContactByIdController))

export default contactRouter;