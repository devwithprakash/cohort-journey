import express from "express"
import type { Express } from "express"

export const createApplication = (): Express => {
    const app = express()

    // middlewares
    app.use(express.json())

    //Routes
    app.use('/', (req, res) => {
        return res.json({ message: "Welcome to BookMyShow" })
    })


    return app
}
