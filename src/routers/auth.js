import express from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { userLoginSchema, userRegisterSchema } from "../validation/user-schema.js";
import { loginController, logoutController, refreshController, registerController, requestResetEmailController, resetPasswordController } from "../controllers/auth.js";
import { requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";


const authRouter = express.Router()

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));

authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(loginController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));

authRouter.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController))

authRouter.post('/reset-pwd',validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController));

export default authRouter;

