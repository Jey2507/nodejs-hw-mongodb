import express from "express"
import pino from "pino-http"
import cors from "cors"

import { env } from "./utils/env.js"
import notFoundHanler from "./middlewares/notFoundHandler.js"
import errorHandler from "./middlewares/errorHandler.js"
import contactRouter from "./routers/contacts.js"

const PORT = env("PORT", "3000")

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors())

    app.use(
        pino({
            transport: {
              target: 'pino-pretty',
            },
          }),
    )

    app.use("/api/contacts", contactRouter);

    app.use(errorHandler)
    app.use(notFoundHanler)

    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
    })
}
