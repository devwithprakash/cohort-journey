import jwt from "jsonwebtoken"

export interface UserTokenPayload {
    id: string
}

// env , token expires

const JWT_SECRET = "mysecret123"

export function createUserToken(payload: UserTokenPayload) {
    const token = jwt.sign(payload, JWT_SECRET)
    return token
}

export function verifyUserToken(token: string) {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as UserTokenPayload
        return payload
    } catch (error) {
        return null
    }
}