"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("inngest/express");
const inggest_1 = require("./config/inggest");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/inngest", (0, express_2.serve)({ client: inggest_1.inggest, functions: inggest_1.functions }));
// Start the server and listen on the specified port
exports.app.listen(env_1.ENV.PORT, () => {
    console.log(`Example app listening at http://localhost:${env_1.ENV.PORT}`);
});
