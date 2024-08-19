"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Constantes_1 = require("./tools/Constantes");
const client_1 = require("@prisma/client");
const UserController_1 = __importDefault(require("./controller/UserController"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(Constantes_1.router);
app.use(UserController_1.default);
app.listen(3000, () => {
    console.log('REST API server ready at: http://localhost:3000');
});
