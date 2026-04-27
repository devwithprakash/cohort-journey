import express from "express"
import path from "path"
import { db } from "./db"
import { userTable } from "./db/schema"
import { eq } from "drizzle-orm"
import crypto from "crypto"
import { JWTClaims } from "./utils/user-token"
import jwt from "jsonwebtoken"
import { PRIVATE_KEY, PUBLIC_KEY } from "./utils/cert"
import jose from "node-jose"

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json())


app.get("/", (req, res) => console.log("Hello from server"))

app.get("/health", (req, res) => {
    res.send({ message: "Server is healthy", healthy: true })
})

app.get("/.well-known/openid-configuration", (req, res) => {
    const ISSUER = `http://localhost:${PORT}`

    return res.json({
        issuer: ISSUER,
        authorization_endpoint: `${ISSUER}/o/authenticate`,
        userinfo_endpoint: `${ISSUER}/o/userinfo`,
        jwks_uri: `${ISSUER}/.well-known/jwks.json`
    })
});

app.get("/.well-known/jwks-json", async (_, res) => {
    const key = await jose.JWK.asKey(PUBLIC_KEY, "pem");
    return res.json({ keys: [key.toJSON()] });
})

app.get("/o/authenticate", (req, res) => {
    return res.sendFile(path.resolve("public", "authentication.html"))
})

app.post("/o/sign-in", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const [user] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

    if (!user || !user.password || !user.salt) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const hash = crypto.createHash("sha256").update(password + user.salt).digest("hex")

    if (hash !== user.password) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const ISSUER = `http://localhost:${PORT}`
    const now = Math.floor(Date.now() / 1000)

    const claims: JWTClaims = {
        iss: ISSUER,
        sub: user.id,
        email: user.email,
        email_verified: user.emailVerified,
        exp: now + 3600,
        given_name: user.first_name ?? "",
        family_name: user.last_name ?? undefined,
        name: [user.first_name, user.last_name].filter(Boolean).join(" "),
        picture: user.profileImageURL ?? undefined,
    };

    const token = jwt.sign(claims, PRIVATE_KEY, { algorithm: "RS256" })

    res.json({ token })
})

app.post("/o/sign-up", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
        return res.status(400).json({ message: "Firstname, email and password are required" })
    }

    const [existingUser] = await db.select({ id: userTable.id }).from(userTable).where(eq(userTable.email, email)).limit(1);

    if (existingUser) {
        return res.status(409).json({ message: "User with this email already exist" })
    };

    const salt = crypto.randomBytes(16).toString("hex")

    const hash = crypto.createHash("sha256").update(password + salt).digest("hex")

    await db.insert(userTable).values({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hash,
        salt: salt
    })

    return res.status(201).json({ ok: true })
})

app.get("/o/userinfo", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }

    const token = authHeader.split(" ")[1]

    let claims: JWTClaims;

    try {

        claims = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] }) as JWTClaims;
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }

    const [user] = await db.select().from(userTable).where(eq(userTable.id, claims.sub)).limit(1)


    if (!user) {
        return res.status(404).json({ message: "User not found" })
    };

    return res.json({
        sub: user.id,
        email: user.email,
        email_verified: user.emailVerified,
        given_name: user.first_name,
        family_name: user.last_name,
        name: [user.first_name, user.last_name].filter(Boolean).join(" "),
        picture: user.profileImageURL,
    })

})



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})