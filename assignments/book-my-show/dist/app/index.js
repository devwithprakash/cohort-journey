"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplication = void 0;
const express_1 = __importDefault(require("express"));
const createApplication = () => {
    const app = (0, express_1.default)();
    // middlewares
    app.use(express_1.default.json());
    //Routes
    app.use('/', (req, res) => {
        return res.json({ message: "Welcome to BookMyShow" });
    });
    return app;
};
exports.createApplication = createApplication;
//# sourceMappingURL=index.js.map