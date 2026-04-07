import http from "node:http";
import 'dotenv/config';
import { createApplication } from "./app";


async function main() {
  try {
    const server = http.createServer(createApplication());
    const PORT: number = Number(process.env.PORT) || 8080;

    server.listen(PORT, () => {
      
    });
  } catch (error) {
    console.log("Error starting http server");
    throw error;
  }
}

main();
