import express from "express";

function response_block() {
  return new Promise((resolve) => {
    const app = express();

    app.get("/text", (req, res) => {
      res.send("Hello from Chaicode");
    });

    app.get("/json", (req, res) => {
      res.json({
        framework: "express",
        version: "6.1.1",
      });
    });

    app.get("/not-found", (req, res) => {
      res.status(404).json({
        error: "Page not found",
      });
    });

    app.get("/health", (req, res) => {
      res.sendStatus(200);
    });

    app.get("/old-menu", (req, res) => {
      //add entry in DB to see how many users are still visiting old route
      res.redirect(301, "/new-menu");
    });

    app.get("/xml", (req, res) => {
      res.type("application/xml").send("<dish> <name>Biryani</name></dish>");
    });

    app.get("/custom-headers", (req, res) => {
      res.set("X-powered-By", "ChaiCode");
      res.set("X-Request-Id", "123545");
      res.json({
        message: "Custom headers set",
      });
    });
    app.get("/no-content", (req, res) => {
      res.status(204).end();
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;
      try {
        //TODO:

        const textRes = await fetch(`${base}/text`);

        const textData = await textRes.text(); // collects data and then convert into string so it takes time

        console.log("text", textData);

        console.log("++++++++++++++++++++++++");

        const jsonRes = await fetch(`${base}/json`);
        const jsonData = await jsonRes.json(); // collects data and then convert into string so it takes time

        console.log("json", jsonData);

        console.log("++++++++++++++++++++++++");

        const notFoundRes = await fetch(`${base}/not-found`);
        const res = await notFoundRes.json();
        console.log("not-found", res);

        console.log("++++++++++++++++++++++++");

        const healthRes = await fetch(`${base}/health`);
        console.log(healthRes.status);

        console.log("++++++++++++++++++++++++");

        const oldMenuRes = await fetch(`${base}/old-menu`);
        console.log(oldMenuRes.status, oldMenuRes.redirected);

        console.log("++++++++++++++++++++++++");

        const xmlRes = await fetch(`${base}/xml`);
        const xmlText = await xmlRes.text();

        console.log(xmlText);
        console.log("++++++++++++++++++++++++");

        const customHeadersRes = await fetch(`${base}/custom-headers`);
        console.log(customHeadersRes.headers.get("X-powered-By"));
        console.log(customHeadersRes.headers.get("X-Request-Id"));

        const customHeadersData = await customHeadersRes.json();
        console.log(customHeadersData);

        console.log("++++++++++++++++++++++++");

        const noContentRes = await fetch(`${base}/no-content`);

        if (noContentRes.status === 204) {
          console.log("No content");
        } else {
          const data = await noContentRes.json();
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }

      server.close(() => {
        console.log("Response block served....");
        resolve();
      });
    });
  });
}

async function main() {
  await response_block();

  process.exit(0);
}

main();
