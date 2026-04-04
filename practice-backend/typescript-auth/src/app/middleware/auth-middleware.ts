import type { NextFunction, Request, Response } from "express";
import { verifyRefreshToken } from "../auth/utils/token";

export function authenticationMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization']

        if (!header) next()
        if (!header?.startsWith('Bearer')) {
            return res.status(400).json({ error: "Authorization header must starts with Bearer" })
        }

        const token = header.split(' ')[1]
        if (!token) {
            return res.status(400).json({ error: "Authorization header must starts with Bearer and with token" })
        }

        const user = verifyRefreshToken(token)

        // @ts-ignore
        req.user = user
        next()
    }
}

export function restrictToAuthentication() {
    return function (req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        if (!req.user) return res.status(401).json({ error: "Authorization requires" })

        return next()
    }
}