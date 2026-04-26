import express from "express"

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
        authorization_endpoint: `${ISSUER}/0/authenticate`,
        userinfo_endpoint: `${ISSUER}/o/userinfo`,
        jwks_uri: `${ISSUER}/.well-known/jwks.json`
    })
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})