"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constantes_1 = require("../tools/Constantes");
const UserService_1 = require("../service/UserService");
Constantes_1.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, UserService_1.login)(email, password);
        res.send({ token });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
}));
Constantes_1.router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const message = yield (0, UserService_1.register)(email, password);
        res.send({ message });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
}));
exports.default = Constantes_1.router;
