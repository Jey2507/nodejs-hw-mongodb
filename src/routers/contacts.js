import express from "express";
import { addContactController, deleteContactByIdController, getAllContactsControllers, getContactByIdController, patchContactController } from "../controllers/contacts.js";
import isValidId from "../middlewares/isValid.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/validotionSchema.js";

const contactRouter = express.Router();

contactRouter.get("/", ctrlWrapper(getAllContactsControllers))

contactRouter.get("/:id", isValidId, ctrlWrapper(getContactByIdController))

contactRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(addContactController))

contactRouter.patch("/:id", isValidId, validateBody(contactUpdateSchema),ctrlWrapper(patchContactController))

contactRouter.delete("/:id",isValidId, ctrlWrapper(deleteContactByIdController))

export default contactRouter;