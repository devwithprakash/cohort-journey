import jwt from "jsonwebtoken"

export interface UserTokenPayload {
    id: string
}

export function createRefreshToken(payload: UserTokenPayload) {
    const secret = process.env.JWT_REFRESH_SECRET as string
    const token = jwt.sign(payload, secret, { expiresIn: "7d" })

    return token
}

export function verifyRefreshToken(token: string) {
    const secret = process.env.JWT_REFRESH_SECRET as string
    try {
        const payload = jwt.verify(token, secret) as UserTokenPayload
        return payload
    } catch (error) {
        return null
    }
}

export function createAccessToken(payload: UserTokenPayload) {
    const secret = process.env.JWT_ACCESS_SECRET as string
    const token = jwt.sign(payload, secret, {expiresIn: "1h"})

    return token
}

export function verifyAccessToken(token: string) {
    const secret = process.env.JWT_ACCESS_SECRET as string
    try {
        const payload = jwt.verify(token, secret) as UserTokenPayload
        return payload
    } catch (error) {
        return null
    }
}