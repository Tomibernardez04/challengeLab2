"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const StatsController_1 = __importDefault(require("./controller/StatsController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(UserController_1.default);
app.use(StatsController_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
