import { Request, Response } from "express"
import { registerPayloadModel } from "./models"
import { createHmac, randomBytes } from "crypto"
import { db } from "../../db"
import { userTable } from "../../db/schema"
import { eq } from "drizzle-orm"

class AuthenticationController {
    public async handleRegister(req: Request, res: Response) {
        const validateResult = await registerPayloadModel.safeParseAsync(req.body)

        if (validateResult.error) return res.status(400).json({ message: "Body validation failed", error: validateResult.error.issues })

        const { firstName, lastName, email, password } = validateResult.data

        const userEmailResult = db.select().from(userTable).where(eq(userTable.email, email))

        if ((await userEmailResult).length > 0) return res.status(400).json({ error: "Duplicate entry", message: `user ith email ${email} already exists` })

        const salt = randomBytes(32).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex')

        const result = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password: hash,
            salt
        }).returning({ id: userTable.id })

        return res.status(201).json({ message: "User registered successfully", data: { id: result[0]?.id } })


    }
}

export default AuthenticationController