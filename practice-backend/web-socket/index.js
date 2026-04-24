import http from "http"
import express from "express"
import { Server } from "socket.io"
import path from "path"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Socket io

io.on('connection', (socket) => {
    console.log("A new user connected", socket.id)
    socket.on('user-message', (message) => {
        console.log("New user message", message)
        io.emit('message', message)
    })

});

app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html")
})


server.listen(8080, () => {
    console.log("Server is listening on PORT 8080")
})