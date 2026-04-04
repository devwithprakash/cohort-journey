import express from "express"
import type { Router } from "express"

import AuthenticationController from "./controller"
import { restrictToAuthentication } from "../middleware/auth-middleware"
const authenticationController = new AuthenticationController()

export const authRouter: Router = express.Router()


authRouter.post('/register', authenticationController.handleRegister.bind(authenticationController))
authRouter.post('/login', authenticationController.handleLogin.bind(authenticationController))
authRouter.get('/me', restrictToAuthentication(), authenticationController.handleMe.bind(authenticationController))

