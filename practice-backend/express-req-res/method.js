import express from "express";

const app = express();

app.use("/api", (req, res, next) => {
  console.log("Jate time milke jana");
  next();
});

app
  .route("/api/schedule")
  .get((req, res) => {
    res.end("Get");
  })
  .post((req, res) => {
    res.end("Post");
  });

const server = app.listen(0, async () => {
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  try {
    const res = await fetch(`${base}/api/schedule`);
    const data = await res.text();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
  server.close(() => {
    console.log("Server is running.....");
  });
});
