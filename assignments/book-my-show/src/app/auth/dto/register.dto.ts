import z from "zod"

export const registerPayload = z.object({
    name: z.string().min(2, { message: "Name is too short" }).max(100, { message: "Name is too long" }),
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(8).max(128).regex(/[A-Z]/, "Must contain an uppercase letter").regex(/[a-z]/, "Must contain an lowercase letter").regex(/[0-9]/, "Must contain a number").regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
    phone: z.string().trim().regex(/^\+91[6-9]\d{9}$/, 'Invalid Indian phone number')
})

export const loginPayload = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(8).max(128).regex(/[A-Z]/, "Must contain an uppercase letter").regex(/[a-z]/, "Must contain an lowercase letter").regex(/[0-9]/, "Must contain a number").regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
})