import express from "express";
import { addContactController, deleteContactByIdController, getAllContactsControllers, getContactByIdController, patchContactController } from "../controllers/contacts.js";
import isValidId from "../middlewares/isValid.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/validotionSchema.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const contactRouter = express.Router();

contactRouter.use(authenticate)

contactRouter.get("/", ctrlWrapper(getAllContactsControllers))

contactRouter.get("/:id", isValidId, ctrlWrapper(getContactByIdController))

contactRouter.post("/", upload.single("photo"), validateBody(contactAddSchema), ctrlWrapper(addContactController))

contactRouter.patch("/:id", isValidId, validateBody(contactUpdateSchema),ctrlWrapper(patchContactController))

contactRouter.delete("/:id",isValidId, ctrlWrapper(deleteContactByIdController))

export default contactRouter;