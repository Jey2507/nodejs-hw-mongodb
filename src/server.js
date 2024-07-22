import express from "express"
import pino from "pino-http"
import cors from "cors"
import cookieParser from "cookie-parser"

import { env } from "./utils/env.js"
import notFoundHanler from "./middlewares/notFoundHandler.js"
import errorHandler from "./middlewares/errorHandler.js"
import contactRouter from "./routers/contacts.js"
import authRouter from "./routers/auth.js"
import { PUBLIC_DIR } from "./constants/index.js"

const PORT = env("PORT", "3000")

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(express.static(PUBLIC_DIR))
    app.use(cors())

    app.use(cookieParser())

    app.use(
        pino({
            transport: {
              target: 'pino-pretty',
            },
          }),
    )

    app.use("/auth", authRouter)
    app.use("/contacts", contactRouter);

    app.use(errorHandler)
    app.use(notFoundHanler)

    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
    })
}
