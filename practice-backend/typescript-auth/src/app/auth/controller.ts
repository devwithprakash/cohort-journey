import { Request, Response } from "express"
import { loginPayloadModel, registerPayloadModel } from "./models"
import { db } from "../../db"
import { userTable } from "../../db/schema"
import { eq } from "drizzle-orm"
import { createAccessToken, createRefreshToken } from "./utils/token"
import type { UserTokenPayload } from "./utils/token"
import { hashPassword, hashToken, verifyPassword } from "./utils/hash"
import ApiError from "../utils/api-error"

class AuthenticationController {

    public async handleRegister(req: Request, res: Response) {
        const validateResult = await registerPayloadModel.safeParseAsync(req.body)
        if (validateResult.error) {
            return res.status(400).json({message: "User validation failed", error: validateResult.error.issues})
        }

        const { firstName, lastName, email, password } = validateResult.data

        const userEmailResult = db.select().from(userTable).where(eq(userTable.email, email))
        if ((await userEmailResult).length > 0) return res.status(400).json({ error: "Duplicate entry", message: `user with email ${email} already exists` })

        const hashedPassword = await hashPassword(password)

        const result = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).returning({ id: userTable.id })

        return res.status(201).json({ message: "User registered successfully", data: { id: result[0]?.id } })
    }

    public async handleLogin(req: Request, res: Response) {
        const validateResult = await loginPayloadModel.safeParseAsync(req.body)
        if (validateResult.error) return res.status(400).json({ message: "Body validation failed", error: validateResult.error.issues })

        const { email, password } = validateResult.data


        const [userSelect] = await db.select().from(userTable).where(eq(userTable.email, email))
        if (!userSelect) return res.status(404).json({ message: `User with email ${email} does not exists ` })

        const hashedPassword = await hashPassword(password)

        const passwordResult = verifyPassword(password, hashedPassword)

        if(!passwordResult) throw ApiError

        const refreshToken = createRefreshToken({ id: userSelect.id })
        const accessToken = createAccessToken({ id: userSelect.id })

        const hashedToken = await hashToken(refreshToken)
        userSelect.refreshToken = hashedToken


        return res.json({ message: "Login success", data: { refreshToken, accessToken } })
    }

    public async handleMe(req: Request, res: Response) {
        // @ts-ignore
        const { id } = req.user! as UserTokenPayload

        const [userResult] = await db.select().from(userTable).where(eq(userTable.id, id))

        return res.json({ firstName: userResult?.firstName, lastName: userResult?.lastName, email: userResult?.email })
    }
}

export default AuthenticationController