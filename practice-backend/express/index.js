// ❌ Without Express (Node.js)

http.createServer((req, res) => {
  console.log(req.method);

  if (req.headers.authorization !== "secret") {
    res.statusCode = 401;
    return res.end("Unauthorized");
  }

  if (req.url === "/profile") {
    res.end("Profile");
  }
});

// ✅ With Express

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.use((req, res, next) => {
  if (req.headers.authorization !== "secret") {
    return res.status(401).send("Unauthorized");
  }
  next();
});

app.get("/profile", (req, res) => {
  res.send("Profile");
});
