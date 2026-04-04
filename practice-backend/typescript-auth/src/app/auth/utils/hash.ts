import bcrypt from "bcryptjs"

export const hashPassword = async(password: string): Promise<string>=>{
    return await bcrypt.hash(password, 12)
}

export const verifyPassword = async(password: string, hash: string)=>{
    return bcrypt.compare(password, hash)
}

export const hashToken = async (token: string): Promise<string> => {
    return await bcrypt.hash(token, 12)
}

export const verifyToken = async (token: string, hash: string) => {
    return bcrypt.compare(token, hash)
}