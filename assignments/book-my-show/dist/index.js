"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const app_1 = require("./app");
function main() {
    try {
        const server = http_1.default.createServer(app_1.createApplication);
        const PORT = Number(process.env.PORT) || 8080;
        server.listen(PORT, () => {
            console.log(`Http server is running on PORT ${PORT}`);
        });
    }
    catch (error) {
        console.log("Error starting http server");
        throw error;
    }
}
main();
//# sourceMappingURL=index.js.map